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
    async getInstanceDetail({ commit, state, getters, rootState }, payload) {
        const instanceId = payload.instanceId
        const requestUrl = `${state.apiUrl}/get-instance-detail`
        const requestBody = { instanceId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateInstanceDetail', { data: request.data, instanceId: instanceId })
    }, 
}

const mutations = {
    // STATISTIC MUTATIONS
    updateInstanceDetail(state, payload) {
        _.each(state.allData, (instance) => {
            if (instance._id === payload.instanceId) {
                instance.stats = _.map(instance.stats, (stat) => {
                    const statUpdate = _.filter(payload.data, (statUpdate, statUpdateId) => {
                        if (statUpdateId === stat._id) return true
                        else return false
                    })[0]
                    stat.requestPayload = statUpdate.requestPayload
                    stat.responsePayload = statUpdate.responsePayload
                    return stat
                })
            }
        })
    },
}

export default {
    getters,
    actions,
    mutations,
}