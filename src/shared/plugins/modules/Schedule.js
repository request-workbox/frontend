import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    schedule: [],
    scheduleType: 'all',
    scheduleStatus: 'all',
    scheduleDate: moment().format('YYYY-MM-DD'),

    orderDirection: 'descending',
    orderBy: 'date',

    currentTime: `${moment().format('h:mm:ss a')}`,
})

const getters = {
    getField,
    getScheduleById: (state, getters, rootState) => (queueId) => {
        if (!queueId) return {}

        const queue = _.filter(state.schedule, (data) => {
            if (data._id === queueId) return true;
            else return false
        })

        return queue[0]
    },
    filterScheduleByWorkflow: (state, getters, rootState) => (workflowId) => {
        if (!workflowId) return []

        const workflow = _.filter(state.schedule, (data) => {
            if (data.workflow === workflowId) return true;
            else return false
        })

        const workflowSchedule = _.filter(workflow, (data) => {
            const startOf = moment(state.scheduleDate).startOf('day')
            const endOf = moment(state.scheduleDate).endOf('day')
            if (moment(data.date).isBetween(startOf, endOf)) return true;
            else return false
        })

        return getters.filterByScheduleType(workflowSchedule)
    },
    filterByScheduleType: (state, getters, rootState) => (workflowSchedule) => {
        const workflowScheduleType = _.filter(workflowSchedule, (data) => {
            if (state.scheduleType === 'all') {
                return true;
            } else if (state.scheduleType === 'return') {
                if (data.queueType === 'return') return true;
                else return false;
            } else if (state.scheduleType === 'queue') {
                if (data.queueType === 'queue') return true;
                else return false;
            } else if (state.scheduleType === 'schedule') {
                if (data.queueType === 'schedule') return true;
                else return false;
            }
        })

        return getters.filterByScheduleStatus(workflowScheduleType)
    },
    filterByScheduleStatus: (state, getters, rootState) => (workflowScheduleType) => {
        const workflowScheduleStatus = _.filter(workflowScheduleType, (data) => {
            if (state.scheduleStatus === 'all') {
                return true;
            } else if (state.scheduleStatus === 'error') {
                if (data.status === 'error') return true
                else return false
            } else if (state.scheduleStatus === 'archived') {
                if (data.status === 'archived') return true
                else if (data.status === 'complete') return true
                else return false
            } else if (state.scheduleStatus === 'active') {
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

        return getters.sortedSchedule(workflowScheduleStatus)
    },
    sortedSchedule: (state, getters, rootState) => (workflowScheduleStatus) => {
        return workflowScheduleStatus.sort(function compare(a, b) {
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

        if (!_.size(state.schedule)) return false

        _.each(state.schedule, (schedule) => {
            if (schedule.status === '' 
                || schedule.status === 'received' 
                || schedule.status === 'uploading' 
                || schedule.status === 'pending' 
                || schedule.status === 'queued' 
                || schedule.status === 'starting' 
                || schedule.status === 'initializing' 
                || schedule.status === 'loading' 
                || schedule.status === 'running') {
                    if (schedule.queueType === 'return') {
                        pendingObj.return = pendingObj.return + 1
                    } else if (schedule.queueType === 'queue') {
                        pendingObj.queue = pendingObj.queue + 1
                    } else if (schedule.queueType === 'schedule') {
                        pendingObj.schedule = pendingObj.schedule + 1
                    }
            }
        })

        pendingObj.total = pendingObj.return + pendingObj.queue + pendingObj.schedule

        return pendingObj
    },
}

const actions = {
    updateField,
    async getSchedule({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/list-queues`
            const requestBody = { workflowId: payload.workflowId, date: payload.date }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            _.each(request.data, (data) => {
                commit('addToSchedule', { queueDoc: data })
            })
        } catch(err) {
            console.log(err)
            throw new Error(err)
        }
    },
    async archiveAllQueue({ commit, state, getters, rootState }, payload) {
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
    changeSchedule(state, payload) {
        state.schedule = payload
    },
    addToSchedule(state, socketStat) {
        if (!socketStat.queueDoc) return;
        
        const schedulesFound = _.filter(state.schedule, (data) => {
            if (data._id === socketStat.queueDoc._id) return true;
            else return false
        })

        if (!_.size(schedulesFound)) {
            state.schedule.push(socketStat.queueDoc)
        } else {
            state.schedule = _.map(state.schedule, (data) => {
                if (data._id === socketStat.queueDoc._id) {
                    return socketStat.queueDoc
                }
                else return data
            })
        }
    },
    changeScheduleDate(state, scheduleDate) {
        state.scheduleDate = scheduleDate
    },
    changeScheduleStatus(state, scheduleStatus) {
        state.scheduleStatus = scheduleStatus
    },
    changeScheduleType(state, scheduleType) {
        state.scheduleType = scheduleType
    },
    updateScheduleOrderDirection(state, payload) {
        state.orderDirection = payload.scheduleOrderDirection
        state.orderBy = payload.scheduleOrderBy

        localStorage.setItem('scheduleOrderDirection', state.orderDirection)
        localStorage.setItem('scheduleOrderBy', state.orderBy)
    },
    toggleScheduleOrderDirection(state, payload) {
        if (state.orderDirection === 'ascending') {
            state.orderDirection = 'descending'
        } else if (state.orderDirection === 'descending') {
            state.orderDirection = 'ascending'
        }

        state.orderBy = payload

        localStorage.setItem('scheduleOrderDirection', state.orderDirection)
        localStorage.setItem('scheduleOrderBy', state.orderBy)
    },
    updateCurrentTime(state, payload) {
        state.currentTime = `${moment().format('h:mm:ss a')}`
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}