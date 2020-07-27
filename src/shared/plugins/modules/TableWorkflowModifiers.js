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
}

const mutations = {
    // WORKFLOW MUTATIONS
}

export default {
    getters,
    actions,
    mutations,
}