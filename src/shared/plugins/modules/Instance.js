import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

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

    instances: [],
    selectedInstanceId: '',
    
    searchTerm: '',
    filter: 'active',
    numberOfRows: 10,
    page: 0,
    editing: false,
    option: '',
    orderDirection: 'descending',
    orderBy: 'date',
})

const getters = {
    getField,
    selectedStat: (state, getters, rootState) => () => {
        if (state.selectedStatId === '') return

        const instance = getters.selectedData()

        if (!_.size(instance.stats)) return

        return _.filter(instance.stats, (data) => {
            if (data._id === state.selectedStatId) return true;
            else return false;
        })[0]
    },
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
    getInstanceByRequestId: (state, getters, rootState) => (requestId, statId, instanceStatId) => {
        if (!requestId) return {}

        const instance = _.filter(state.instances, (data) => {
            if (data.requestId === requestId) return true;
            else return false
        })

        if (!_.size(instance)) return {}

        const filtered = _.filter(instance, (data) => {
            if (data._id === statId) return true;
            else return false
        })

        if (!_.size(filtered)) return {}

        if (!instanceStatId) return filtered[0]
        
        const instanceStat = _.filter(filtered[0].stats, (data) => {
            if (data._id === instanceStatId) return true;
            else return false
        })

        return instanceStat[0]
    },
    getInstanceByWorkflowId: (state, getters, rootState) => (workflowId, statId, instanceStatId) => {
        if (!workflowId) return {}

        const instance = _.filter(state.instances, (data) => {
            if (data.workflowId === workflowId) return true;
            else return false
        })

        if (!_.size(instance)) return {}

        const filtered = _.filter(instance, (data) => {
            if (data._id === statId) return true;
            else return false
        })

        if (!_.size(filtered)) return {}

        if (!instanceStatId) return filtered[0]
        
        const instanceStat = _.filter(filtered[0].stats, (data) => {
            if (data._id === instanceStatId) return true;
            else return false
        })

        return instanceStat[0]
    },
}

const actions = {
    async getInstance({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-instance`
            const requestBody = { projectId: payload.projectId, instanceId: payload.instanceId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceAllData', { data: [request.data] })
            commit('resetPage')
            commit('changeSelectedId', { selectedId: request.data._id })

            return sendResponse(request.data, 'Request created.')
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

            return sendResponse(request.data, 'Request created.')
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

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async downloadInstanceStat({ commit, state, getters, rootState }, { instanceId, statId, }) {
        try {
            const requestUrl = `${state.apiUrl}/download-instance-stat`
            const requestBody = { instanceId, statId, }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateField,

    changeOption(state, payload) {
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
    changeQueueDate(state, queueDate) {
        state.queueDate = queueDate
    },
    changeQueueStatus(state, queueStatus) {
        state.queueStatus = queueStatus
    },
    changeQueueType(state, queueType) {
        state.queueType = queueType
    },
    updateQueueOrderDirection(state, payload) {
        state.orderDirection = payload.queueOrderDirection
        state.orderBy = payload.queueOrderBy

        localStorage.setItem('queueOrderDirection', state.orderDirection)
        localStorage.setItem('queueOrderBy', state.orderBy)
    },
    toggleQueueOrderDirection(state, payload) {
        if (state.orderDirection === 'ascending') {
            state.orderDirection = 'descending'
        } else if (state.orderDirection === 'descending') {
            state.orderDirection = 'ascending'
        }

        state.orderBy = payload

        localStorage.setItem('queueOrderDirection', state.orderDirection)
        localStorage.setItem('queueOrderBy', state.orderBy)
    },
    updateCurrentTime(state, payload) {
        state.currentTime = `${moment().format('h:mm:ss a')}`
    },
    updateInstanceDetail(state, payload) {
        _.each(state.allData, (instance) => {
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
        _.each(state.allData, (instance) => {
            if (instance._id === payload.instanceId) {
                instance.usage = payload.data.usage
            }
        })
    },
    changeSelectedInstanceStatId(state, payload) {
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