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
    async getStatistics({ commit, state, getters, rootState }, payload) {
        const instanceId = payload.instanceId
        const requestUrl = `${state.apiUrl}/get-statistics`
        const requestBody = { instanceId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateInstanceStatistics', { instanceId: instanceId, data: request.data })
    },
}

const mutations = {
    // STATISTIC MUTATIONS
    updateInstanceStatistics(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.instanceId) {
                data.statistics = payload.data
            }
        })
    },
}

export default {
    getters,
    actions,
    mutations,
}