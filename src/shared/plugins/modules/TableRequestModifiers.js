import Vue from 'vue'
import _ from 'lodash'



const getters = {
    // REQUEST GETTERS
    requestsForSelect: (state, getters, rootState) => () => {
        return _.filter(state.requestsForSelectOptions, (data) => {
            if (data.active) return true;
            else return false
        })
    },
}

const actions = {
    // REQUEST ACTIONS
    async getRequests({ commit, state, getters, rootState }, payload) {
        const projectId = (payload && payload.projectId) ? payload.projectId : rootState.project.projectInfo.projectId
        const requestUrl = `${state.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    async getRequest({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/get-request`
        const requestBody = { projectId: payload.projectId, requestId: payload.requestId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: [request.data] })
        commit('resetPage')
        commit('changeSelectedId', { selectedId: request.data._id })
    },
    async getRequestsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = (payload && payload.projectId) ? payload.projectId : rootState.project.projectInfo.projectId
        const requestUrl = `${state.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceRequestsForSelectOptions', { data: request.data })
    },
    async cancelRequestChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-request`
        const requestBody = { requestId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequest', request.data)
        commit('stopEditing')
    },
    async saveRequestChanges({ commit, state, getters, rootState }, request) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/save-request-changes`
            const requestBody = request
            await Vue.$axios.post(requestUrl, requestBody)
            commit('stopEditing')
            commit('replaceHeaderSpaces', { requestId: request._id })
        } catch(err) {
            if (err.response && err.response.data) {
                throw new Error(err.response.data)
            }
        }
    },
    async addRequestDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))
        const requestUrl = `${state.apiUrl}/add-request-detail-item`
        const requestBody = { _id: untrackedPayload._id, requestDetailOption: untrackedPayload.option }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequest', request.data)
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
    async archiveRequest({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/archive-request`
        const requestBody = { requestId: payload.requestId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editRequestToArchive', { requestId: payload.requestId })
        commit('changeSelectedId', { selectedId: '' })
    },
    async restoreRequest({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/restore-request`
        const requestBody = { requestId: payload.requestId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editRequestToRestore', { requestId: payload.requestId })
        commit('changeSelectedId', { selectedId: '' })
    },
    async deleteRequest({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-request`
        const requestBody = { requestId: payload.requestId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
}

const mutations = {
    // REQUEST MUTATIONS
    updateRequest(state, payload) {
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
    editRequestDetailValueType(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.valueType = payload.value
                    }
                })
            }
        })
    },
    // request
    editRequestToArchive(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data.active = false
            }
        })
    },
    editRequestToRestore(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data.active = true
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
    replaceRequestsForSelectOptions(state, payload) {
        state.requestsForSelectOptions = payload.data
    },
    replaceHeaderSpaces(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data.headers, (headerObj) => {
                    headerObj.key = headerObj.key.replace(/ /g,'-')
                })
            }
        })
    }
}

export default {
    getters,
    actions,
    mutations,
}