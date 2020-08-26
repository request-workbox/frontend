import Vue from 'vue'
import _ from 'lodash'



const getters = {
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
    requestsForSelect: (state, getters, rootState) => () => {
        return _.filter(state.requestsForSelectOptions, (data) => {
            if (data.active) {
                if (data.requestSettings.requestType === 'adapter') return false;
                else return true;
            } else {
                return false
            }
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
    async getRequestsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = (payload && payload.projectId) ? payload.projectId : rootState.project.projectInfo.projectId
        const requestUrl = `${state.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceRequestsForSelectOptions', { data: request.data })
    },
    async cancelRequestChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-request-details`
        const requestBody = { requestId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequest', request.data)
        commit('stopEditing')
    },
    async saveRequestChanges({ commit, state, getters, rootState }, request) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/save-request-changes`
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
    async addRequestAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/add-request-adapter`
        const requestBody = { _id: payload.requestId, adapterType: payload.type }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateRequestAdapter', { type: payload.type, item: request.data, requestId: payload.requestId })
    },
    async deleteRequestAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-request-adapter`
        const requestBody = { _id: payload.requestId, adapterType: payload.type, adapterId: payload.adapterId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeRequestAdapter', { type: payload.type, adapterId: payload.adapterId, requestId: payload.requestId })
    },
    async archiveAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/archive-adapter`
        const requestBody = { adapterId: payload.adapterId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editAdapterToArchive', { adapterId: payload.adapterId })
    },
    async restoreAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/restore-adapter`
        const requestBody = { adapterId: payload.adapterId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editAdapterToRestore', { adapterId: payload.adapterId })
    },
    async deleteAdapter({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-adapter`
        const requestBody = { adapterId: payload.adapterId }
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
    editRequestAdapter(state, payload) {
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
    editAdapterToArchive(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.adapterId) {
                data.active = false
            }
        })
    },
    editAdapterToRestore(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.adapterId) {
                data.active = true
            }
        })
    },
    updateRequestAdapter(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                data[payload.type].push(payload.item)
            }
        })

    },
    removeRequestAdapter(state, payload) {
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
    replaceRequestsForSelectOptions(state, payload) {
        state.requestsForSelectOptions = payload.data
    },
    editAdapterInput(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.adapterId) {
                        if (!_.size(obj.inputs)) {
                            obj.inputs = {}
                        }
                        if (!_.size(obj.inputs[payload.input])) {
                            obj.inputs[payload.input] = {}
                        }
                        obj.inputs[payload.input][payload.inputKey] = payload.value
                    }
                })
            }
        })
    },
    changeAdapterPosition(state, payload) {
        state.editing = true
        _.each(state.allData, (data) => {
            if (data._id === payload.requestId) {
                // find current position
                let newPosition;
                let updatedArraySize;
                _.each(data[payload.type], (obj, key) => {
                    if (obj._id === payload.adapterId) {
                        newPosition = key - 1
                    }
                })
                // remove adapter
                const adapter  = _.remove(data[payload.type], (obj) => {
                    if (obj._id === payload.adapterId) return true;
                    else return false;
                })[0]
                // update adapter array
                const updatedAdapters = _.filter(data[payload.type], (obj) => {
                    if (obj._id === payload.adapterId) return false;
                    else return true;
                })
                // empty adapters
                data[payload.type] = []
                // get current array size
                updatedArraySize = _.size(updatedAdapters)
                // insert at new position if not last
                _.each(updatedAdapters, (obj, key) => {
                    if (key === (newPosition)) {
                        data[payload.type].push(adapter)
                    }
                    data[payload.type].push(obj)
                })
                // insert at new position if last
                if (newPosition === -1) {
                    data[payload.type].push(adapter)
                }
            }
        })
    }
}

export default {
    getters,
    actions,
    mutations,
}