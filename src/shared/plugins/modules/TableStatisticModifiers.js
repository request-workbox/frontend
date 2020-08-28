import Vue from 'vue'
import _ from 'lodash'



const getters = {
    // STATISTIC GETTERS
}

const actions = {
    // STATISTIC ACTIONS
    async getInstances({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-instances`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
}

const mutations = {
    // STATISTIC MUTATIONS
}

export default {
    getters,
    actions,
    mutations,
}