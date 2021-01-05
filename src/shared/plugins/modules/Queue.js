import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    queues: [],
    queueType: 'all',
    queueStatus: 'all',
    queueDate: moment().format('YYYY-MM-DD'),

    orderDirection: 'descending',
    orderBy: 'date',

    currentTime: `${moment().format('h:mm:ss a')}`,

    option: 'results',

    selectedQueueStatId: '',
})

const getters = {
    getField,
    getQueueByRequestId: (state, getters, rootState) => (requestId, queueStatId) => {
        if (!requestId) return {}

        console.log(state.queues)

        console.log(requestId)
        console.log(queueStatId)
        const queue = _.filter(state.queues, (data) => {
            if (data.requestId === requestId) return true;
            else return false
        })

        if (!_.size(queue)) return {}

        console.log('found queue', queue)

        const filtered = _.filter(queue, (data) => {
            if (data._id === queueStatId) return true;
            else return false
        })

        if (!_.size(filtered)) return {}

        return filtered[0]
    },
    getQueueByWorkflowId: (state, getters, rootState) => (workflowId, queueStatId) => {
        if (!workflowId) return {}

        const queue = _.filter(state.queues, (data) => {
            if (data.workflowId === workflowId) return true;
            else return false
        })

        if (!_.size(queue)) return {}

        const filtered = _.filter(queue, (data) => {
            if (data._id === queueStatId) return true;
            else return false
        })

        if (!_.size(filtered)) return {}

        return filtered[0]
    },
    getQueueById: (state, getters, rootState) => (queueId) => {
        if (!queueId) return {}

        const queue = _.filter(state.queues, (data) => {
            if (data._id === queueId) return true;
            else return false
        })

        return queue[0]
    },
    filterQueueByWorkflow: (state, getters, rootState) => (workflowId) => {
        if (!workflowId) return []

        const workflow = _.filter(state.queues, (data) => {
            if (data.workflowId === workflowId) return true;
            else return false
        })

        const workflowSchedule = _.filter(workflow, (data) => {
            const startOf = moment(state.queueDate).startOf('day')
            const endOf = moment(state.queueDate).endOf('day')
            if (moment(data.date).isBetween(startOf, endOf)) return true;
            else return false
        })

        return getters.filterByQueueType(workflowSchedule)
    },
    filterByQueueType: (state, getters, rootState) => (workflowSchedule) => {
        const workflowQueueType = _.filter(workflowSchedule, (data) => {
            if (state.queueType === 'all') {
                return true;
            } else if (state.queueType === 'return') {
                if (data.queueType === 'return') return true;
                else return false;
            } else if (state.queueType === 'queue') {
                if (data.queueType === 'queue') return true;
                else return false;
            } else if (state.queueType === 'schedule') {
                if (data.queueType === 'schedule') return true;
                else return false;
            }
        })

        return getters.filterByQueueStatus(workflowQueueType)
    },
    filterByQueueStatus: (state, getters, rootState) => (workflowQueueType) => {
        const workflowQueueStatus = _.filter(workflowQueueType, (data) => {
            if (state.queueStatus === 'all') {
                return true;
            } else if (state.queueStatus === 'error') {
                if (data.status === 'error') return true
                else return false
            } else if (state.queueStatus === 'archived') {
                if (data.status === 'archived') return true
                else if (data.status === 'complete') return true
                else return false
            } else if (state.queueStatus === 'active') {
                if (data.status === 'received') return true
                else if (data.status === 'uploading') return true
                else if (data.status === 'pending') return true
                else if (data.status === 'queued') return true
                else if (data.status === 'starting') return true
                else if (data.status === 'initializing') return true
                else if (data.status === 'loading') return true
                else if (data.status === 'running') return true
                else return false
            }
        })

        return getters.sortedSchedule(workflowQueueStatus)
    },
    sortedQueues: (state, getters, rootState) => (workflowQueueStatus) => {
        return workflowQueueStatus.sort(function compare(a, b) {
            var dateA = new Date(a[state.orderBy])
            var dateB = new Date(b[state.orderBy])
            if (state.orderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.orderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    pendingQueues: (state, getters, rootState) => () => {
        const pendingObj = {
            total: 0, return: 0, queue: 0, schedule: 0,
        }

        if (!_.size(state.queues)) return false

        _.each(state.queues, (queue) => {
            if (queue.status === '' 
                || queue.status === 'received' 
                || queue.status === 'uploading' 
                || queue.status === 'pending' 
                || queue.status === 'queued' 
                || queue.status === 'starting' 
                || queue.status === 'initializing' 
                || queue.status === 'loading' 
                || queue.status === 'running') {
                    if (queue.queueType === 'return') {
                        pendingObj.return = pendingObj.return + 1
                    } else if (queue.queueType === 'queue') {
                        pendingObj.queue = pendingObj.queue + 1
                    } else if (queue.queueType === 'schedule') {
                        pendingObj.queue = pendingObj.schedule + 1
                    }
            }
        })

        pendingObj.total = pendingObj.return + pendingObj.queue + pendingObj.schedule

        return pendingObj
    },
}

const actions = {
    updateField,
    async listQueues({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/list-queues`
            const requestBody = { workflowId: payload.workflowId, date: payload.date }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            _.each(request.data, (queueDoc) => {
                commit('addToQueues', queueDoc)
            })
        } catch(err) {
            console.log(err)
            throw new Error(err)
        }
    },
    async archiveAllQueues({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-all-queues`
            const request = await Vue.$axios.post(requestUrl, payload)
        } catch(err) {
            console.log(err)
            throw new Error(err)
        }
    },
    async archiveQueue({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-queue`
            const requestBody = { queueId: payload }
            const request = await Vue.$axios.post(requestUrl, requestBody)
        } catch(err) {
            console.log(err)
            throw new Error(err)
        }
    },
}

const mutations = {
    changeOption(state, payload) {
        state.option = payload
    },
    updateQueues(state, payload) {
        state.queues = payload
    },
    addToQueues(state, queueDoc) {
        const queuesFound = _.filter(state.queues, (data) => {
            if (data._id === queueDoc._id) return true;
            else return false
        })

        if (!_.size(queuesFound)) {
            state.queues.push(queueDoc)
        } else {
            state.queues = _.map(state.queues, (data) => {
                if (data._id === queueDoc._id) {
                    return queueDoc
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
    changeSelectedQueueStatId(state, payload) {
        if (state.selectedQueueStatId === payload) {
            state.selectedQueueStatId = ''
        } else {
            state.selectedQueueStatId = payload
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