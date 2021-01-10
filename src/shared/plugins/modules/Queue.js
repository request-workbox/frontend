import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const pagination = require('./QueuePagination')

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

    queues: [],
    queueType: 'all',
    queueStatus: 'all',
    queueDate: moment().format('YYYY-MM-DD'),
    currentTime: `${moment().format('h:mm:ss a')}`,
    selectedQueueId: '',

    searchTerm: '',
    filter: 'active',
    numberOfRows: 7,
    page: 0,
    editing: false,
    option: 'results',
    queueOrderDirection: 'descending',
    queueOrderBy: 'date',
})

const getters = {
    getField,
    ...pagination.getters,
}

const actions = {
    ...pagination.actions,

    async listQueues({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/list-queues`
            const requestBody = { workflowId: payload.workflowId, date: payload.date }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            _.each(request.data, (queueDoc) => {
                commit('addToQueues', queueDoc)
            })

            return sendResponse(request.data, 'Queues loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async archiveAllQueues({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-all-queues`
            const request = await Vue.$axios.post(requestUrl, payload)

            return sendResponse(request.data, 'Multiple queues archived.')
        } catch(err) {
            return throwError(err)
        }
    },
    async archiveQueue({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-queue`
            const requestBody = { queueId: payload }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            return sendResponse(request.data, 'Queue archived.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateField,
    ...pagination.mutations,

    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    updateQueues(state, payload) {
        state.queues = payload
    },
    addToQueues(state, queueDoc) {
        const queuesFound = _.filter(state.queues, (data) => {
            if (data._id === queueDoc._id) return true
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
    editQueueDate(state, queueDate) {
        state.queueDate = queueDate
    },
    editQueueStatus(state, queueStatus) {
        state.queueStatus = queueStatus
    },
    editQueueType(state, queueType) {
        state.queueType = queueType
    },
    editCurrentTime(state, payload) {
        state.currentTime = `${moment().format('h:mm:ss a')}`
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}