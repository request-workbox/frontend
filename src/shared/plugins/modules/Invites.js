import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

function sendResponse(response, message) {
    if (message && message !== '') Vue.$toast.open({ message, })
    return response
}

function throwError(err) {
    if (err.request && err.request.responseText) {
        console.log(err.request.responseText)
        Vue.$toast.open({ message: err.request.responseText })
        throw new Error(err.request.responseText)
    } else {
        throw new Error(err.message)
    }
}

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    invites: [],

    inviteOrderDirection: 'descending',
    inviteOrderBy: 'createdAt',
})

const getters = {
    visibleInvites: (state, getters) => () => {
        return _.map(state.invites).sort(function compare(a, b) {
            var dateA = new Date(a[state.inviteOrderBy])
            var dateB = new Date(b[state.inviteOrderBy])
            if (state.inviteOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.inviteOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
}

const actions = {
    async listInvites({ commit, state, rootState }, payload) {
        try {
            if (state.editing) return

            const requestUrl = `${state.apiUrl}/list-invites`
            const request = await Vue.$axios.post(requestUrl)

            commit('updateInvites', request.data)

            return sendResponse(request.data, 'Invites loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async createInvite({ commit, state, rootState }, { projectId, username }) {
        try {
            const requestUrl = `${state.apiUrl}/create-invite`
            const requestBody = { projectId, username }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            return sendResponse(request.data, 'Invite created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async acceptInvite({ commit, state, rootState }, projectId) {
        try {
            const requestUrl = `${state.apiUrl}/accept-invite`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            return sendResponse(request.data, 'Invite accepted.')
        } catch(err) {
            return throwError(err)
        }
    },
    async removeInvite({ commit, state, rootState }, { projectId, username }) {
        try {
            const requestUrl = `${state.apiUrl}/remove-invite`
            const requestBody = { projectId, username }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            return sendResponse(request.data, 'Invite removed.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateInvites(state, payload) {
        state.invites = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}