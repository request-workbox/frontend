import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'

const state = () => ({
    numberOfRows: 5,
    page: 0,

    filter: 'active',

    allRequests: [],

    requestId: '',

    searchTerm: '',

    editing: false,

    option: 'url',
})

const getters = {
    getField,
    selectedRequest: (state, getters) => () => {
        if (state.requestId === '') return {}

        return _.filter(state.allRequests, (request) => {
            if (request._id === state.requestId) return true;
            else return false;
        })[0]
    },
    currentPage: (state, getters) => () => {
        return (getters.totalPages() === 0) ? 0 : state.page + 1
    },
    totalPages: (state, getters) => () => {
        return getters.chunkedRequests().length
    },
    pagination: (state, getters) => () => {
        return `${getters.currentPage()} / ${getters.totalPages()}`
    },

    requestsByFilter: (state, getters) => () => {
        return _.filter(state.allRequests, (request) => {
            if (state.filter === 'active') {
                if (request.active) return true
                else return false
            } else if (state.filter === 'deleted') {
                if (!request.active) return true
                else return false
            } else {
                return true
            }
        })
    },
    requestsBySearchTerm: (state, getters) => () => {
        return _.filter(getters.requestsByFilter(), (request) => {
            if (state.searchTerm === '') return true

            if (_.includes(request.url, state.searchTerm)) return true;
            else return false;
        })
    },
    chunkedRequests: (state, getters) => () => {
        return _.chunk(getters.requestsBySearchTerm(), state.numberOfRows)
    },
    viewableRequests: (state, getters) => () => {
        return getters.chunkedRequests()[state.page]
    },

    adapters: (state, getters) => () => {
        return _.filter(state.allRequests, (request) => {
            if (request.active) {
                if (request.requestSettings.requestType === 'adapter') return true;
                else return false;
            } else {
                return false
            }
        })
    },
}

const actions = {
    previousPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() <= 1) return
        commit('decrementPage')
    },
    nextPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() === getters.totalPages()) return
        commit('incrementPage')
    },
    async getRequests({ commit, state, getters, rootState }, payload) {
        const projectId = (payload && payload.projectId) ? payload.projectId : rootState.request.requestProject.projectId
        const requestUrl = `${rootState.request.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceRequests', { requests: request.data })
        commit('resetPage')
    },
    async selectOrDeselectRow({ commit, state, getters, rootState }, request) {
        if (state.editing) return;

        if (state.requestId === request._id) {
            commit('changeRequestId', { requestId: '' })
        } else {
            commit('changeRequestId', { requestId: request._id })
        }
    },
    async cancelChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${rootState.request.apiUrl}/get-request-details`
        const requestBody = { requestId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequestDetails', request.data)
        commit('stopEditing')
    },
    async saveChanges({ commit, state, getters, rootState }, request) {
        if (!state.editing) return;

        const requestUrl = `${rootState.request.apiUrl}/save-changes`
        const requestBody = request
        await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
    async addRequestDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))
        const requestUrl = `${rootState.request.apiUrl}/add-request-detail-item`
        const requestBody = { _id: untrackedPayload._id, requestDetailOption: untrackedPayload.option }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequestDetailItem', { requestDetailOption: untrackedPayload.option, item: request.data, requestId: untrackedPayload._id })
    },
    async deleteRequestDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))

        const requestId = untrackedPayload.requestId
        const requestDetailItemId = untrackedPayload.detailItem._id
        const requestUrl = `${rootState.request.apiUrl}/delete-request-detail-item`
        const requestBody = { _id: requestId, requestDetailOption: untrackedPayload.option, requestDetailItemId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeRequestDetailItem', { requestDetailOption: untrackedPayload.option, requestDetailItemId, requestId: requestId })
    },
    async addAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${rootState.request.apiUrl}/add-adapter`
        const requestBody = { _id: payload.requestId, adapterType: payload.type }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateAdapter', { type: payload.type, item: request.data, requestId: payload.requestId })
    },
    async deleteAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${rootState.request.apiUrl}/delete-adapter`
        const requestBody = { _id: payload.requestId, adapterType: payload.type, adapterId: payload.adapterId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeAdapter', { type: payload.type, adapterId: payload.adapterId, requestId: payload.requestId })
    },
}

const mutations = {
    updateField,
    decrementPage(state) {
        state.page--
    },
    incrementPage(state) {
        state.page++
    },
    changeOption(state, payload) {
        if (state.editing) return;
        
        state.option = payload
    },
    changeFilter(state, { filter }) {
        state.filter = filter
        state.page = 0
    },
    resetPage(state) {
        state.page = 0
    },
    replaceRequests(state, { requests }) {
        state.allRequests = requests
    },
    changeRequestId(state, { requestId }) {
        state.requestId = requestId
    },
    updateRequestDetails(state, payload) {
        _.each(state.allRequests, (request) => {
            if (request._id === payload._id) {
                _.each(request, (value, key) => {
                    request[key] = payload[key]
                })
            }
        })
    },
    editRequestDetail(state, payload) {
        state.editing = true

        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                request[payload.type][payload.key] = payload.value
            }
        })
    },
    editRequestDetailKey(state, payload) {
        state.editing = true

        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                _.each(request[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.key = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailValue(state, payload) {
        state.editing = true

        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                _.each(request[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.value = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailAcceptInput(state, payload) {
        state.editing = true

        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                _.each(request[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.acceptInput = payload.value
                    }
                })
            }
        })
    },
    editAdapter(state, payload) {
        state.editing = true

        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                _.each(request[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj[payload.key] = payload.value
                    }
                })
            }
        })
    },
    updateAdapter(state, payload) {
        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                request[payload.type].push(payload.item)
            }
        })

    },
    removeAdapter(state, payload) {
        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                request[payload.type] = _.filter(request[payload.type], (obj) => {
                    if (obj._id === payload.adapterId) return false;
                    else return true;
                })
            }
        })
    },
    updateRequestDetailItem(state, payload) {
        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                request[payload.requestDetailOption].push(payload.item)
            }
        })

    },
    removeRequestDetailItem(state, payload) {
        _.each(state.allRequests, (request) => {
            if (request._id === payload.requestId) {
                request[payload.requestDetailOption] = _.filter(request[payload.requestDetailOption], (obj) => {
                    if (obj._id === payload.requestDetailItemId) return false;
                    else return true;
                })
            }
        })
    },
    stopEditing(state) {
        state.editing = false
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}