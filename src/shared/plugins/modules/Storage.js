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

    storages: [],
    selectedStorageId: '',
    
    searchTerm: '',
    filter: 'active',
    numberOfRows: 10,
    page: 0,
    editing: false,
    option: 'details',
    orderDirection: 'descending',
    orderBy: 'date',
})

const getters = {
    getField,

}

const actions = {
    async createStorage({ commit, state, rootState }, { projectId, storageType }) {
        try {
            const requestUrl = `${state.apiUrl}/create-storage`
            const requestBody = { projectId, storageType }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            commit('addStorage', request.data)
            commit('changeSelectedId', { selectedId: request.data._id })

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async listStorages({ commit, state, getters, rootState }, payload) {
        try {
            const projectId = payload.projectId
            const requestUrl = `${state.apiUrl}/list-storages`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceAllData', { data: request.data })
            commit('resetPage')

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getStorage({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-storage`
            const requestBody = { projectId: payload.projectId, storageId: payload.storageId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceAllData', { data: [request.data] })
            commit('resetPage')
            commit('changeSelectedId', { selectedId: request.data._id })

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getStorageUsage({ commit, state, getters, rootState }, payload) {
        try {
            if (!payload.storageId) return

            const storageId = payload.storageId
            const requestUrl = `${state.apiUrl}/get-storage-usage`
            const requestBody = { storageId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateStorageUsage', { data: request.data, storageId: storageId })

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },

    async getTextStorageData({ commit, state, getters, rootState }, { storageId }) {
        try {
            const requestUrl = `${state.apiUrl}/get-text-storage-data`
            const requestBody = { storageId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editStorageValue', { storageId, key: 'storageValue', value: request.data.storageValue })

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getFileStorageData({ commit, state, getters, rootState }, { storageId }) {
        try {
            const requestUrl = `${state.apiUrl}/get-file-storage-data`
            const requestBody = { storageId }
            const request = await Vue.$axios.post(requestUrl, requestBody)
            
            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async updateTextStorageData({ commit, state, getters, rootState }, { storageId, storageValue }) {
        try {
            const requestUrl = `${state.apiUrl}/update-text-storage-data?storageId=${storageId}`
            const requestHeaders = { 'Content-Type': 'multipart/form-data' }
            const request = await Vue.$axios.post(requestUrl, { storageValue }, requestHeaders)

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async updateFileStorageData({ commit, state, getters, rootState }, { storageId, storageValue }) {
        try {
            const formData = new FormData()
            formData.append('file', storageValue)
            const requestUrl = `${state.apiUrl}/update-file-storage-data?storageId=${storageId}`
            const requestHeaders = { 'Content-Type': 'multipart/form-data' }
            const request = await Vue.$axios.post(requestUrl, formData, requestHeaders)

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    
    async cancelStorageChanges({ commit, state, getters, rootState }, { _id }) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/get-storage`
            const requestBody = { storageId: _id }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateStorage', request.data)
            commit('stopEditing')

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async saveStorageChanges({ commit, state, getters, rootState }, storage) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/save-storage-changes`
            const requestBody = storage
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('stopEditing')

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },

    async archiveStorage({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-storage`
            const requestBody = { storageId: payload.storageId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editStorageToArchive', { storageId: payload.storageId })
            commit('changeSelectedId', { selectedId: '' })

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async restoreStorage({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/restore-storage`
            const requestBody = { storageId: payload.storageId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editStorageToRestore', { storageId: payload.storageId })
            commit('changeSelectedId', { selectedId: '' })

            return sendResponse(request.data, 'Request created.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateField,

    addStorage(state, payload) {
        state.allData.push(payload)
    },
    updateStorage(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editStorageDetail(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.storageId) {
                data[payload.key] = payload.value
            }
        })
    },
    editStorageValue(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.storageId) {
                data[payload.key] = payload.value
            }
        })
    },
    editStorageToArchive(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.storageId) {
                data.active = false
            }
        })
    },
    editStorageToRestore(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.storageId) {
                data.active = true
            }
        })
    },
    replaceStoragesForSelectOptions(state, payload) {
        state.storagesForSelectOptions = payload.data
    },
    updateStorageUsage(state, payload) {
        _.each(state.allData, (storage) => {
            if (storage._id === payload.storageId) {
                storage.usage = payload.data.usage
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