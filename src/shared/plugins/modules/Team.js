import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const pagination = require('./TeamPagination')

function sendResponse(response, message) {
    console.log('response', JSON.parse(JSON.stringify(response)))
    console.log('message', message)
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

    editing: false,
    
    teamOrderDirection: 'descending',
    teamOrderBy: 'createdAt',
})

const getters = {
    getField,
    ...pagination.getters,
}

const actions = {
    ...pagination.actions,
    
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
}

const mutations = {
    updateField,
    ...pagination.mutations,

    updateTeam(state, payload) {
        state.team = payload
    },
    updateIncludeSensitive(state, { memberId, value }) {
        state.editing = true

        console.log(memberId)
        console.log(value)

        state.team = _.map(state.team, (member) => {
            if (member._id === memberId) {
                member.includeSensitive = value
            }

            return member
        })
    },
    updatePermission(state, { memberId, value }) {
        state.editing = true

        console.log(memberId)
        console.log(value)

        state.team = _.map(state.team, (member) => {
            if (member._id === memberId) {
                member.permission = value
            }

            return member
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