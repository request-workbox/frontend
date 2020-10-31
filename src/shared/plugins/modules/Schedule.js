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
                else if (data.status === 'queued') return true
                else if (data.status === 'running') return true
            }
        })

        return workflowScheduleStatus
    }
}

const actions = {
    updateField,
    async getSchedule({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-schedule`
            const requestBody = { workflow: payload.workflowId, date: payload.date }
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
            const requestUrl = `${state.apiUrl}/archive-all-queue`
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}