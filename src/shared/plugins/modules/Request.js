import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const pagination = require('./RequestPagination')

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

    requests: [],
    selectedRequestId: '',
    
    searchTerm: '',
    filter: 'active',
    numberOfRows: 7,
    page: 0,
    editing: false,
    option: 'url',
    requestOrderDirection: 'descending',
    requestOrderBy: 'createdAt',

    forceComputedForWebhookCancelChanges: 0,
})

const getters = {
    getField,
    ...pagination.getters,
}

const actions = {
    ...pagination.actions,

    async createRequest({ commit, state, rootState }, { projectId }) {
        try {
            const requestUrl = `${state.apiUrl}/create-request`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('addRequest', request.data)
            commit('editSelectedRequestId', request.data._id)
            
            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async listRequests({ commit, state, getters, rootState }, payload) {
        try {
            const projectId = (payload && payload.projectId) ? payload.projectId : rootState.project.projectInfo.projectId
            const requestUrl = `${state.apiUrl}/list-requests`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceRequests', request.data)
            commit('resetPage')

            return sendResponse(request.data, 'Requests loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getRequest({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-request`
            const requestBody = { projectId: payload.projectId, requestId: payload.requestId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('addRequest', request.data)
            commit('resetPage')
            commit('editSelectedRequestId', request.data._id)

            return sendResponse(request.data, 'Request found.')
        } catch(err) {
            return throwError(err)
        }
    },
    async cancelRequestChanges({ commit, state, getters, rootState }, { _id }) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/get-request`
            const requestBody = { requestId: _id }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateRequest', request.data)
            commit('stopEditing')

            return sendResponse(request.data, 'Request changes cancelled.')
        } catch(err) {
            return throwError(err)
        }
    },
    async saveRequestChanges({ commit, state, getters, rootState }, payload) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/save-request-changes`
            const requestBody = payload
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceHeaderSpaces', { requestId: request._id })
            commit('stopEditing')

            return sendResponse(request.data, 'Request changes saved.')
        } catch(err) {
            return throwError(err)
        }
    },

    async addRequestDetailItem({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/add-request-detail-item`
            const requestBody = { _id: payload._id, requestDetailOption: payload.option }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateRequest', request.data)

            return sendResponse(request.data, 'Request detail item added.')
        } catch(err) {
            return throwError(err)
        }
    },
    async deleteRequestDetailItem({ commit, state, getters, rootState }, payload) {
        try {
            const untrackedPayload = JSON.parse(JSON.stringify(payload))

            const requestId = untrackedPayload.requestId
            const requestDetailItemId = untrackedPayload.detailItem._id
            const requestUrl = `${state.apiUrl}/delete-request-detail-item`
            const requestBody = { _id: requestId, requestDetailOption: untrackedPayload.option, requestDetailItemId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('removeRequestDetailItem', { requestDetailOption: untrackedPayload.option, requestDetailItemId, requestId: requestId })

            return sendResponse(request.data, 'Request detail item deleted.')
        } catch(err) {
            return throwError(err)
        }
    },

    async returnRequest({ commit, state, getters, rootState }, requestId) {
        try {
            const requestUrl = `${state.apiUrl}/return-request/${requestId}`
            const request = await Vue.$axios.post(requestUrl)
            
            return sendResponse(request.data, 'Request returned.')
        } catch(err) {
            return throwError(err)
        }
    },
    async queueRequest({ commit, state, getters, rootState }, requestId) {
        try {
            const requestUrl = `${state.apiUrl}/queue-request/${requestId}`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Request queued.')
        } catch(err) {
            return throwError(err)
        }
    },
    async scheduleRequest({ commit, state, getters, rootState }, requestId) {
        try {
            const requestUrl = `${state.apiUrl}/schedule-request/${requestId}?date=${moment().add(1, 'minute').toISOString()}`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Request scheduled.')
        } catch(err) {
            return throwError(err)
        }
    },

    async archiveRequest({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-request`
            const requestBody = { requestId: payload.requestId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editRequestToArchive', { requestId: payload.requestId })
            commit('editSelectedRequestId', '')

            return sendResponse(request.data, 'Request archived.')
        } catch(err) {
            return throwError(err)
        }
    },
    async restoreRequest({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/restore-request`
            const requestBody = { requestId: payload.requestId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editRequestToRestore', { requestId: payload.requestId })
            commit('editSelectedRequestId', '')

            return sendResponse(request.data, 'Request restored.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateField,
    ...pagination.mutations,

    addRequest(state, payload) {
        const found = _.filter(state.requests, (data) => {
            if (data._id === payload._id) return true
            else return false
        })

        if (!_.size(found)) state.requests.push(payload)
    },
    replaceRequests(state, payload) {
        if (!payload || !_.size(payload)) return

        state.requests = payload
    },
    updateRequest(state, payload) {
        _.each(state.requests, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editRequestKey(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                data[payload.key] = payload.value
            }
        })
    },
    editRequestDetail(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                data[payload.type][payload.key] = payload.value
            }
        })
    },
    editRequestDetailKey(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.key = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailActive(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.active = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailValue(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.value = payload.value
                    }
                })
            }
        })
    },
    editRequestAuthorization(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                _.each(data.authorization, (obj) => {
                    if (obj._id === payload._id) {
                        obj[payload.key] = payload.value
                    }
                })
            }
        })
    },
    editRequestDetailValueType(state, payload) {
        state.editing = true

        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.valueType = payload.value
                    }
                })
            }
        })
    },
    editRequestToArchive(state, payload) {
        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                data.active = false
            }
        })
    },
    editRequestToRestore(state, payload) {
        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                data.active = true
            }
        })
    },
    updateRequestDetailItem(state, payload) {
        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                data[payload.requestDetailOption].push(payload.item)
            }
        })

    },
    removeRequestDetailItem(state, payload) {
        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                data[payload.requestDetailOption] = _.filter(data[payload.requestDetailOption], (obj) => {
                    if (obj._id === payload.requestDetailItemId) return false;
                    else return true;
                })
            }
        })
    },
    replaceHeaderSpaces(state, payload) {
        _.each(state.requests, (data) => {
            if (data._id === payload.requestId) {
                _.each(data.headers, (headerObj) => {
                    headerObj.key = headerObj.key.replace(/ /g,'-')
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
    mutations
}