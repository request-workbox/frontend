import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    option: 'settings',
    editing: false,

    selectedWorkflowId: '',
    workflowsForSelectOptions: [],
    requestsForSelectOptions: [],

    statuschecks: [],
})

const getters = {
    getField,
    workflowsForSelect: (state, getters, rootState) => () => {
        return _.filter(state.workflowsForSelectOptions, (data) => {
            if (data.active) return true;
            else return false
        })
    },
    requestsForSelect: (state, getters, rootState) => () => {
        return _.filter(state.requestsForSelectOptions, (data) => {
            if (data.active) return true;
            else return false
        })
    },

    tasks: (state, getters, rootState) => {
        if (!state.selectedWorkflowId) return []

        const workflow = _.filter(state.workflowsForSelectOptions, (workflow) => {
            if (workflow._id === state.selectedWorkflowId) return true
            else return false
        })[0]

        return _.map(workflow.tasks, (task) => {
            const request = _.filter(state.requestsForSelectOptions, (request) => {
                if (task.requestId === request._id) return true
                else return false
            })[0]

            return {
                _id: task._id,
                requestId: request._id,
                ..._.omit(request, '_id'),
            }
        })
    },

}

const actions = {
    updateField,
    async getWorkflowsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-workflows`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceWorkflowsForSelectOptions', { data: request.data })
    },
    async getRequestsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceRequestsForSelectOptions', { data: request.data })
    },
    async getStatuschecks({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-statuschecks`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceStatuschecks', { data: request.data })
    },
}

const mutations = {
    replaceWorkflowsForSelectOptions(state, payload) {
        state.workflowsForSelectOptions = payload.data
    },
    replaceRequestsForSelectOptions(state, payload) {
        state.requestsForSelectOptions = payload.data
    },
    changeSelectedWorkflowId(state, payload) {
        state.selectedWorkflowId = payload.target.value
    },
    replaceStatuschecks(state, payload) {
        state.statuschecks = payload.data
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}