import Vue from 'vue'
import _ from 'lodash'

const getters = {
    // STATISTIC GETTERS
    selectedStat: (state, getters, rootState) => () => {
        if (state.selectedStatId === '') return

        const instance = getters.selectedData()

        if (!_.size(instance.stats)) return

        return _.filter(instance.stats, (data) => {
            if (data._id === state.selectedStatId) return true;
            else return false;
        })[0]
    },
    firstStatId: (state, getters, rootState) => (instanceId) => {
         const instance = _.filter(state.allData, (data) => {
            if (data._id === instanceId) return true;
            else return false;
        })[0]

        if (!_.size(instance.stats)) return

        return instance.stats[0]._id
    },
    // This is used by Statistic and Storage usage views
    usageTotals: (state, getters, rootState) => (docId) => {
        const totals = { 'kb down': 0, 'kb up': 0, 'time': 0, }

        if (!docId) return totals

        const instance = _.filter(state.allData, (data) => {
           if (data._id === docId) return true;
           else return false;
       })[0]

       if (!_.size(instance.usage)) return totals

       totals['kb down'] = String((((instance.totalBytesDown || 0) / 1000) || 0).toFixed(2)) + ' kb'
       totals['kb up'] = String((((instance.totalBytesUp || 0) / 1000) || 0).toFixed(2)) + ' kb'
       totals['time'] = String((((instance.totalMs || 0) / 1000) || 0).toFixed(2)) + ' seconds'

        return totals
   },
}

const actions = {
    // STATISTIC ACTIONS
    async getInstances({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/list-instances`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    async getInstance({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/get-instance`
        const requestBody = { projectId: payload.projectId, instanceId: payload.instanceId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: [request.data] })
        commit('resetPage')
        commit('changeSelectedId', { selectedId: request.data._id })
    },
    async getInstanceDetail({ commit, state, getters, rootState }, payload) {
        const instanceId = payload.instanceId
        const requestUrl = `${state.apiUrl}/get-instance-detail`
        const requestBody = { instanceId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateInstanceDetail', { data: request.data, instanceId: instanceId })
    },
    async getInstanceUsage({ commit, state, getters, rootState }, payload) {
        if (!payload.instanceId) return;
        const instanceId = payload.instanceId
        const requestUrl = `${state.apiUrl}/get-instance-usage`
        const requestBody = { instanceId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateInstanceUsage', { data: request.data, instanceId: instanceId })
    },
    async deleteAllStats({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/delete-stats`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
    async downloadInstanceStat({ commit, state, getters, rootState }, { instanceId, statId, }) {
        const requestUrl = `${state.apiUrl}/download-instance-stat`
        const requestBody = { instanceId, statId, }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return request
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
                    stat.downloadPayload = statUpdate.downloadPayload
                    return stat
                })
            }
        })
    },
    updateInstanceUsage(state, payload) {
        _.each(state.allData, (instance) => {
            if (instance._id === payload.instanceId) {
                instance.usage = payload.data.usage
            }
        })
    },
    changeSelectedStatId(state, payload) {
        state.selectedStatId = payload
    }
}

export default {
    getters,
    actions,
    mutations,
}