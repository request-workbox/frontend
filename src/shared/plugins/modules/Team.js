import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const pagination = require('./TeamPagination')

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

    team: [],
    
    teamOrderDirection: 'descending',
    teamOrderBy: 'createdAt',
})

const getters = {
    getField,
    ...pagination.getters,
}

const actions = {
    async listTeam({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/list-team`
            const requestBody = { projectId: payload }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateTeam', request.data)
            commit('stopEditing')

            return sendResponse(request.data, 'Team loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async updateTeam({ commit, state, rootState }, projectId) {
        try {
            const requestUrl = `${state.apiUrl}/update-team`
            const requestBody = { team: state.team, projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('stopEditing')

            return sendResponse(request.data, 'Team updated.')
        } catch(err) {
            return throwError(err)
        }
    },
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
    updateField,
    ...pagination.mutations,

    updateTeam(state, payload) {
        state.team = payload
    },
    updateIncludeSensitive(state, { memberId, value }) {
        state.editing = true

        state.team = _.map(state.team, (member) => {
            if (member._id === memberId) {
                member.includeSensitive = value
            }

            return member
        })
    },
    updatePermission(state, { memberId, value }) {
        state.editing = true

        state.team = _.map(state.team, (member) => {
            if (member._id === memberId) {
                member.permission = value
            }

            return member
        })
    },
    editPermissions(state, { permissionKey, projectId, value }) {
        state.editing = true
        state.projects = _.map(state.projects, (project) => {
            if (project._id === projectId) {
                project[permissionKey] = value
            }
            return project;
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}