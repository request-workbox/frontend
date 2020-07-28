import Vue from 'vue'
import _ from 'lodash'



const getters = {
    // WORKFLOW GETTERS
}

const actions = {
    // WORKFLOW ACTIONS
    async getWorkflows({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-workflows`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    async cancelWorkflowChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-workflow-details`
        const requestBody = { workflowId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateWorkflow', request.data)
        commit('stopEditing')
    },
    async saveWorkflowChanges({ commit, state, getters, rootState }, workflow) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/save-workflow-changes`
        const requestBody = workflow
        await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
}

const mutations = {
    // WORKFLOW MUTATIONS
    updateWorkflow(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editWorkflowDetail(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.workflowId) {
                data[payload.key] = payload.value
            }
        })
    }
}

export default {
    getters,
    actions,
    mutations,
}