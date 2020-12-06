import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    editing: false,
    option: 'payloads',
    
    selectedWebhookId: '',
    webhooks: [],
    webhookDetails: [],

    webhookOrderDirection: 'ascending',

    webhookDate: moment().format('YYYY-MM-DD'),
})

const getters = {
    getField,
    sortedWebhooks: (state, getters) => {
        return _.map(state.webhooks).sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            if (state.webhookOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.webhookOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    sortedWebhookDetails: (state, getters) => {
        if (!state.selectedWebhookId) return []

        const foundWebhookDetails = _.filter(state.webhookDetails, (webhookDetail) => {
            if (webhookDetail.webhookId === state.selectedWebhookId) {
                const startOf = moment(state.webhookDate).startOf('day')
                const endOf = moment(state.webhookDate).endOf('day')
                if (moment(webhookDetail.createdAt).isBetween(startOf, endOf)) return true
                else return false
            }
            else return false
        })

        return _.map(foundWebhookDetails).sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            
            return dateB - dateA
        })
    },
    selectedWebhook: (state, getters) => {
        if (!state.selectedWebhookId) return {}

        return _.filter(state.webhooks, (webhook) => {
            if (webhook._id === state.selectedWebhookId) return true
            else return false
        })[0]
    },
}

const actions = {
    updateField,
    async getWebhooks({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-webhooks`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceWebhooks', request.data)
    },
    async newWebhook({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/new-webhook`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('addWebhook', request.data)
    },
    async getWebhookDetails({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-webhook-details`
            const requestBody = { webhookId: payload.webhookId, date: payload.date }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            _.each(request.data, (data) => {
                commit('addToWebhookDetails', data)
            })
        } catch(err) {
            console.log(err)
            throw new Error(err)
        }
    },
    async downloadWebhookDetail({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/download-webhook-detail`
        const requestBody = { webhookDetailId: payload.webhookDetailId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return request
    },
    async cancelChanges({ commit, state, getters, rootState }, payload) {
        const webhookId = payload.webhookId
        const requestUrl = `${state.apiUrl}/get-webhook`
        const requestBody = { webhookId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceWebhook', request.data)
    },
    async saveChanges({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/save-webhook-changes`
        const requestBody = payload
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
}

const mutations = {
    replaceWebhooks(state, payload) {
        state.webhooks = payload
    },
    addWebhook(state, payload) {
        state.webhooks.push(payload)
    },
    updateSelectedWebhookId(state, payload) {
        if (state.editing) return;
        
        if (state.selectedWebhookId === payload) {
            state.selectedWebhookId = ''
        } else {
            state.selectedWebhookId = payload
        }
    },
    updateWebhookOrderDirection(state, payload) {
        state.webhookOrderDirection = payload.webhookOrderDirection
        localStorage.setItem('webhookOrderDirection', state.webhookOrderDirection)
    },
    toggleWebhookOrderDirection(state, payload) {
        if (state.webhookOrderDirection === 'ascending') {
            state.webhookOrderDirection = 'descending'
        } else if (state.webhookOrderDirection === 'descending') {
            state.webhookOrderDirection = 'ascending'
        }

        localStorage.setItem('webhookOrderDirection', state.webhookOrderDirection)
    },
    changeWebhookDate(state, webhookDate) {
        state.webhookDate = webhookDate
    },
    addToWebhookDetails(state, payload) {
        const webhookDetailsFound = _.filter(state.webhookDetails, (webhookDetail) => {
            if (webhookDetail._id === payload._id) return true
            else return false
        })

        if (!_.size(webhookDetailsFound)) {
            state.webhookDetails.push(payload)
        } else {
            state.webhookDetails = _.map(state.webhookDetails, (webhookDetail) => {
                if (webhookDetail._id === payload._id) return payload
                else return webhookDetail
            })
        }
    },
    changeOption(state, payload) {
        if (state.editing) return;
        
        state.option = payload
    },
    editWebhook(state, payload) {
        state.editing = true

        _.map(state.webhooks, (webhook) => {
            if (webhook._id !== payload.selectedWebhookId) return webhook

            webhook[payload.key] = payload.value
            return webhook
        })
    },
    replaceWebhook(state, payload) {
        state.webhooks = _.map(state.webhooks, (webhook) => {
            if (webhook._id !== payload._id) return webhook
            return payload
        })
        state.editing = false
    },
    stopEditing(state, payload) {
        state.editing = false
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}