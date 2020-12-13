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

    lastInstance: {},
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
    statuscheck: (state, getters, rootState) => {
        if (!state.selectedWorkflowId) return {}

        const statuscheck = _.filter(state.statuschecks, (data) => {
            if (data.workflowId === state.selectedWorkflowId) return true
            else return false
        })[0]

        return statuscheck
    },
    requestStats: (state, getters, rootState) => (requestId) => {
        if (!state.selectedWorkflowId) return {}
        if (!requestId) return {}

        if (state.lastInstance.workflow !== state.selectedWorkflowId) return {}

        const requestStat = _.filter(state.lastInstance.stats, (stat) => {
            if (stat.requestId === requestId) return true
            else return false
        })
        
        if (!_.size(requestStat)) return {}
        else {
            return requestStat[0]
        }
    },
}

const actions = {
    updateField,
    async getWorkflowsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/list-workflows`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceWorkflowsForSelectOptions', { data: request.data })
    },
    async getRequestsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/list-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceRequestsForSelectOptions', { data: request.data })
    },
    async getStatuschecks({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/list-statuschecks`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceStatuschecks', { data: request.data })
    },
    async cancelChanges({ commit, state, getters, rootState }, payload) {
        const statuscheckId = payload.statuscheckId
        const requestUrl = `${state.apiUrl}/get-statuscheck`
        const requestBody = { statuscheckId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceStatuscheck', request.data)
    },
    async saveChanges({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/save-statuscheck-changes`
        const requestBody = payload
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
    async startStatuscheck({ commit, state, getters, rootState }, payload) {
        const statuscheckId = payload.statuscheckId
        const requestUrl = `${state.apiUrl}/start-statuscheck`
        const requestBody = { statuscheckId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateStatuscheckStatus', { statuscheckId, status: 'running' })
    },
    async stopStatuscheck({ commit, state, getters, rootState }, payload) {
        const statuscheckId = payload.statuscheckId
        const requestUrl = `${state.apiUrl}/stop-statuscheck`
        const requestBody = { statuscheckId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateStatuscheckStatus', { statuscheckId, status: 'stopped' })
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
    replaceStatuscheck(state, payload) {
        state.statuschecks = _.map(state.statuschecks, (statuscheck) => {
            if (statuscheck._id !== payload._id) return statuscheck
            return payload
        })
        state.editing = false
    },
    editStatuscheck(state, payload) {
        state.editing = true

        state.statuschecks = _.map(state.statuschecks, (statuscheck) => {
            if (statuscheck.workflowId !== state.selectedWorkflowId) return statuscheck

            statuscheck[payload.key] = payload.value
            return statuscheck
        })
    },
    updateStatuscheckStatus(state, payload) {
        state.statuschecks = _.map(state.statuschecks, (statuscheck) => {
            if (statuscheck._id !== payload.statuscheckId) return statuscheck

            statuscheck.status = payload.status
            return statuscheck
        })
    },
    stopEditing(state, payload) {
        state.editing = false
    },
    addStatuscheckResults(state, payload) {
        if (!payload.instanceDoc) return;

        state.lastInstance = payload.instanceDoc
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}