import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

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

    instances: [],
    selectedInstanceId: '',
    selectedInstanceStatId: '',
    
    searchTerm: '',
    filter: 'active',
    numberOfRows: 10,
    page: 0,
    editing: false,
    option: 'results',
    instanceOrderDirection: 'descending',
    instanceOrderBy: 'createdAt',
})

const getters = {
    getField,

    visibleInstances: (state, getters) => () => {
        return state.instances
    },

    selectedInstance: (state, getters, rootState) => () => {
        if (state.selectedInstanceId === '') return {}

       const foundData = _.filter(state.instances, (data) => {
            if (data._id === state.selectedInstanceId) return true
            else return false
        })

        if (!_.size(foundData)) return {}

        return foundData[0]
    },
    getInstanceByQueueId: (state, getters, rootState) => (queueId) => {
        if (!queueId) return {}

        const instance = _.filter(state.instances, (data) => {
            if (data.queueId === queueId) return true
            else return false
        })

        if (!_.size(instance)) return {}

        return instance[0]
    },
    getInstanceById: (state, getters, rootState) => (instanceId) => {
        if (!instanceId) return {}

        const instances = _.filter(state.instances, (data) => {
            if (String(data._id) === String(instanceId)) return true
            else return false
        })

        if (!_.size(instances)) return {}

        return instances[0]
    },
    getInstanceStatById: (state, getters, rootState) => (instanceId, instanceStatId) => {
        if (!instanceId) return {}

        const instances = _.filter(state.instances, (data) => {
            if (data._id === instanceId) return true
            else return false
        })

        if (!_.size(instances)) return {}

        const stat = _.filter(instances[0].stats, (stat) => {
            if (stat._id === instanceStatId) return true
            else return false
        })

        if (!_.size(stat)) return {}

        return stat[0]
    },
}

const actions = {
    usageTotals({ commit, state, getters, rootState }, payload) {
        const totals = { 'kb down': 0, 'kb up': 0, 'time': 0, }

        if (!state.selectedInstanceId) return totals

        let instance = _.filter(state.instances, (data) => {
           if (data._id === state.selectedInstanceId) return true
           else return false
        })

        console.log(instance)

        if (!_.size(instance)) return totals
        if (!instance[0].usage || !_.size(instance.usage)) return totals

        console.log(instance)

        instance = instance[0]
        
        console.log(instance)

        totals['kb down'] = String((((instance.totalBytesDown || 0) / 1000) || 0).toFixed(2)) + ' kb'
        totals['kb up'] = String((((instance.totalBytesUp || 0) / 1000) || 0).toFixed(2)) + ' kb'
        totals['time'] = String((((instance.totalMs || 0) / 1000) || 0).toFixed(2)) + ' seconds'

        return totals
    },

    async getInstance({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-instance`
            const requestBody = { projectId: payload.projectId, instanceId: payload.instanceId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('addToInstances', request.data)
            commit('editSelectedInstanceId', request.data._id)

            return sendResponse(request.data)
        } catch(err) {
            return throwError(err)
        }
    },
    async getInstanceDetail({ commit, state, getters, rootState }, payload) {
        try {
            const instanceId = payload.instanceId
            const requestUrl = `${state.apiUrl}/get-instance-detail`
            const requestBody = { instanceId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateInstanceDetail', { data: request.data, instanceId: instanceId })

            return sendResponse(request.data, 'Instance detail loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getInstanceUsage({ commit, state, getters, rootState }, payload) {
        try {
            if (!payload.instanceId) return

            const instanceId = payload.instanceId
            const requestUrl = `${state.apiUrl}/get-instance-usage`
            const requestBody = { instanceId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateInstanceUsage', { data: request.data, instanceId: instanceId })
            commit('editSelectedInstanceId', instanceId)

            return sendResponse(request.data, 'Instance usage loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async downloadInstanceStat({ commit, state, getters, rootState }, { instanceId, statId, }) {
        try {
            const requestUrl = `${state.apiUrl}/download-instance-stat`
            const requestBody = { instanceId, statId, }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            return sendResponse(request.data, 'Instance downloaded.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateField,

    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    addToInstances(state, instanceDoc) {
        const instancesFound = _.filter(state.instances, (data) => {
            if (data._id === instanceDoc._id) return true;
            else return false
        })

        if (!_.size(instancesFound)) {
            state.instances.push(instanceDoc)
        } else {
            state.instances = _.map(state.instances, (data) => {
                if (data._id === instanceDoc._id) {
                    return instanceDoc
                }
                else return data
            })
        }
    },
    updateInstanceDetail(state, payload) {
        _.each(state.instances, (instance) => {
            if (instance._id === payload.instanceId) {
                instance.stats = _.map(instance.stats, (stat) => {
                    const 
                        taskId = stat.taskId,
                        taskField = stat.taskField;

                    const taskStats = payload.data[taskField]

                    _.each(taskStats, (taskStat) => {
                        if (taskStat._id === taskId) {
                            stat.requestPayload = taskStat.requestPayload
                            stat.responsePayload = taskStat.responsePayload
                            stat.downloadPayload = taskStat.downloadPayload
                        }
                    })

                    return stat
                    
                })
            }
        })
    },
    updateInstanceUsage(state, payload) {
        _.each(state.instances, (instance) => {
            if (instance._id === payload.instanceId) {
                instance.usage = payload.data.usage
            }
        })
    },
    editSelectedInstanceId(state, payload) {
        state.selectedInstanceId = payload
    },
    editSelectedInstanceStatId(state, payload) {
        if (state.selectedInstanceStatId === payload) {
            state.selectedInstanceStatId = ''
        } else {
            state.selectedInstanceStatId = payload
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}