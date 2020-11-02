import Vue from 'vue'
import _ from 'lodash'



const getters = {
    // STORAGE GETTERS
    storagesForSelect: (state, getters, rootState) => () => {
        return _.filter(state.storagesForSelectOptions, (data) => {
            if (data.active) return true;
            else return false
        })
    },
}

const actions = {
    // STORAGE ACTIONS
    async getStorages({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-storages`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    // STORAGE ACTIONS
    async getStorage({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/get-storage`
        const requestBody = { projectId: payload.projectId, storageId: payload.storageId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
        commit('changeSelectedId', { selectedId: request.data[0]._id })
    },
    async getStoragesForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-storages`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceStoragesForSelectOptions', { data: request.data })
    },
    async getTextStorageData({ commit, state, getters, rootState }, { storageId }) {
        const requestUrl = `${state.apiUrl}/get-text-storage-data`
        const requestBody = { storageId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editStorageValue', { storageId, key: 'storageValue', value: request.data.storageValue })
    },
    async getFileStorageData({ commit, state, getters, rootState }, { storageId }) {
        const requestUrl = `${state.apiUrl}/get-file-storage-data`
        const requestBody = { storageId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return request
    },
    async updateTextStorageData({ commit, state, getters, rootState }, { storageId, storageValue }) {
        const requestUrl = `${state.apiUrl}/update-text-storage-data?storageid=${storageId}`
        const requestHeaders = { 'Content-Type': 'multipart/form-data' }
        const request = await Vue.$axios.post(requestUrl, { storageValue }, requestHeaders)
    },
    async updateFileStorageData({ commit, state, getters, rootState }, { storageId, storageValue }) {
        const formData = new FormData()
        formData.append('file', storageValue)
        const requestUrl = `${state.apiUrl}/update-file-storage-data?storageid=${storageId}`
        const requestHeaders = { 'Content-Type': 'multipart/form-data' }
        const request = await Vue.$axios.post(requestUrl, formData, requestHeaders)
    },
    async cancelStorageChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-storage-details`
        const requestBody = { storageId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateStorage', request.data)
        commit('stopEditing')
    },
    async saveStorageChanges({ commit, state, getters, rootState }, storage) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/save-storage-changes`
        const requestBody = storage
        await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
    async archiveStorage({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/archive-storage`
        const requestBody = { storageId: payload.storageId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editStorageToArchive', { storageId: payload.storageId })
        commit('changeSelectedId', { selectedId: '' })
    },
    async restoreStorage({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/restore-storage`
        const requestBody = { storageId: payload.storageId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editStorageToRestore', { storageId: payload.storageId })
        commit('changeSelectedId', { selectedId: '' })
    },
    async deleteStorage({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-storage`
        const requestBody = { storageId: payload.storageId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
}

const mutations = {
    // STORAGE MUTATIONS
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
}

export default {
    getters,
    actions,
    mutations,
}