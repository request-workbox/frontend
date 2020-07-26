import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'

const state = () => ({
    apiUrl: 'http://localhost:3000',

    selectedId: '',

    numberOfRows: 5,
    searchTerm: '',
    filter: 'active',
    allData: [],
    page: 0,
    editing: false,
    option: 'url',
})

const getters = {
    getField,

    // GENERAL GETTERS
    pagination: (state, getters) => () => {
        return `${getters.currentPage()} / ${getters.totalPages()}`
    },
    currentPage: (state, getters) => () => {
        return (getters.totalPages() === 0) ? 0 : state.page + 1
    },
    totalPages: (state, getters) => () => {
        return getters.chunkedData().length
    },
    dataByFilter: (state, getters) => () => {
        return _.filter(state.allData, (data) => {
            if (state.filter === 'active') {
                if (data.active) return true
                else return false
            } else if (state.filter === 'deleted') {
                if (!data.active) return true
                else return false
            } else {
                return true
            }
        })
    },
    dataBySearchTerm: (state, getters) => () => {
        return _.filter(getters.dataByFilter(), (data) => {
            if (state.searchTerm === '') return true

            if (_.includes(data.url.url, state.searchTerm)) return true;
            else return false;
        })
    },
    chunkedData: (state, getters) => () => {
        return _.chunk(getters.dataBySearchTerm(), state.numberOfRows)
    },
    viewableData: (state, getters) => () => {
        return getters.chunkedData()[state.page]
    },
    selectedData: (state, getters, rootState) => () => {
        if (state.selectedId === '') return {}

        return _.filter(state.allData, (data) => {
            if (data._id === state.selectedId) return true;
            else return false;
        })[0]
    },

    // REQUEST GETTERS
    adapters: (state, getters, rootState) => () => {
        return _.filter(state.allData, (data) => {
            if (data.active) {
                if (data.requestSettings.requestType === 'adapter') return true;
                else return false;
            } else {
                return false
            }
        })
    },
}

const actions = {
    // GENERAL ACTIONS
    previousPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() <= 1) return
        commit('decrementPage')
    },
    nextPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() === getters.totalPages()) return
        commit('incrementPage')
    },
    async selectOrDeselectRow({ commit, state, getters, rootState }, data) {
        if (state.editing) return;

        if (state.selectedId === data._id) {
            commit('changeSelectedId', { selectedId: '' })
        } else {
            commit('changeSelectedId', { selectedId: data._id })
        }
    },

    // REQUEST ACTIONS
    async getRequests({ commit, state, getters, rootState }, payload) {
        const projectId = (payload && payload.projectId) ? payload.projectId : rootState.project.projectInfo.projectId
        const requestUrl = `${state.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    async cancelChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-request-details`
        const requestBody = { requestId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequestDetails', request.data)
        commit('stopEditing')
    },
    async saveChanges({ commit, state, getters, rootState }, request) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/save-changes`
        const requestBody = request
        await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
    async addRequestDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))
        const requestUrl = `${state.apiUrl}/add-request-detail-item`
        const requestBody = { _id: untrackedPayload._id, requestDetailOption: untrackedPayload.option }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequestDetailItem', { requestDetailOption: untrackedPayload.option, item: request.data, requestId: untrackedPayload._id })
    },
    async deleteRequestDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))

        const requestId = untrackedPayload.requestId
        const requestDetailItemId = untrackedPayload.detailItem._id
        const requestUrl = `${state.apiUrl}/delete-request-detail-item`
        const requestBody = { _id: requestId, requestDetailOption: untrackedPayload.option, requestDetailItemId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeRequestDetailItem', { requestDetailOption: untrackedPayload.option, requestDetailItemId, requestId: requestId })
    },
    async addAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/add-adapter`
        const requestBody = { _id: payload.requestId, adapterType: payload.type }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateAdapter', { type: payload.type, item: request.data, requestId: payload.requestId })
    },
    async deleteAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-adapter`
        const requestBody = { _id: payload.requestId, adapterType: payload.type, adapterId: payload.adapterId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeAdapter', { type: payload.type, adapterId: payload.adapterId, requestId: payload.requestId })
    },
}

const mutations = {
    updateField,

    // GENERAL MUTATIONS
    resetPage(state) {
        state.page = 0
    },
    changeFilter(state, { filter }) {
        state.filter = filter
        state.page = 0
    },
    stopEditing(state) {
        state.editing = false
    },
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
    replaceAllData(state, { data }) {
        state.allData = data
    },
    changeSelectedId(state, { selectedId }) {
        state.selectedId = selectedId
    },

    // REQUEST MUTATIONS
    updateRequestDetails(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editRequestDetail(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data[payload.type][payload.key] = payload.value
            }
        })
    },
    editRequestDetailKey(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.key = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailValue(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.value = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailAcceptInput(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.acceptInput = payload.value
                    }
                })
            }
        })
    },
    editAdapter(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload._id) {
                        obj[payload.key] = payload.value
                    }
                })
            }
        })
    },
    updateAdapter(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data[payload.type].push(payload.item)
            }
        })

    },
    removeAdapter(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data[payload.type] = _.filter(data[payload.type], (obj) => {
                    if (obj._id === payload.adapterId) return false;
                    else return true;
                })
            }
        })
    },
    updateRequestDetailItem(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data[payload.requestDetailOption].push(payload.item)
            }
        })

    },
    removeRequestDetailItem(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data[payload.requestDetailOption] = _.filter(data[payload.requestDetailOption], (obj) => {
                    if (obj._id === payload.requestDetailItemId) return false;
                    else return true;
                })
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}