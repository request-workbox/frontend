import Vue from 'vue'
import _ from 'lodash'



const getters = {
    // ENVIRONMENT GETTERS
    environments: (state, getters, rootState) => () => {
        return state.environmentsForSelectOptions
    },
}

const actions = {
    // ENVIRONMENT ACTIONS
    async getEnvironments({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-environments`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    async getEnvironmentsForSelectOptions({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-environments`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceEnvironmentsForSelectOptions', { data: request.data })
    },
    async cancelEnvironmentChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-environment-details`
        const requestBody = { environmentId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateEnvironment', request.data)
        commit('stopEditing')
    },
    async saveEnvironmentChanges({ commit, state, getters, rootState }, environment) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/save-environment-changes`
        const requestBody = environment
        await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
    async deleteEnvironmentDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))

        const environmentId = untrackedPayload.environmentId
        const environmentDetailItemId = untrackedPayload.detailItem._id
        const requestUrl = `${state.apiUrl}/delete-environment-detail-item`
        const requestBody = { _id: environmentId, environmentDetailOption: untrackedPayload.option, environmentDetailItemId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeEnvironmentDetailItem', { environmentDetailOption: untrackedPayload.option, environmentDetailItemId, environmentId: environmentId })
    },
    async addEnvironmentDetailItem({ commit, state, getters, rootState }, payload) {
        const untrackedPayload = JSON.parse(JSON.stringify(payload))
        const requestUrl = `${state.apiUrl}/add-environment-detail-item`
        const requestBody = { _id: untrackedPayload._id, environmentDetailOption: untrackedPayload.option }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateEnvironmentDetailItem', { environmentDetailOption: untrackedPayload.option, item: request.data, environmentId: untrackedPayload._id })
    },
    async archiveEnvironment({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/archive-environment`
        const requestBody = { environmentId: payload.environmentId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editEnvironmentToArchive', { environmentId: payload.environmentId })
        commit('changeSelectedId', { selectedId: '' })
    },
    async restoreEnvironment({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/restore-environment`
        const requestBody = { environmentId: payload.environmentId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editEnvironmentToRestore', { environmentId: payload.environmentId })
        commit('changeSelectedId', { selectedId: '' })
    },
    async deleteEnvironment({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-environment`
        const requestBody = { environmentId: payload.environmentId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
}

const mutations = {
    // ENVIRONMENT MUTATIONS
    updateEnvironment(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editEnvironmentDetail(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                data[payload.key] = payload.value
            }
        })
    },
    editEnvironmentDetailKey(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.key = payload.value
                    }
                })
            }
        })
    },
    editEnvironmentDetailValue(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.value = payload.value
                    }
                })
            }
        })
    },
    editEnvironmentDetailActive(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload.key) {
                        obj.active = payload.value
                    }
                })
            }
        })
    },
    removeEnvironmentDetailItem(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                data[payload.environmentDetailOption] = _.filter(data[payload.environmentDetailOption], (obj) => {
                    if (obj._id === payload.environmentDetailItemId) return false;
                    else return true;
                })
            }
        })
    },
    updateEnvironmentDetailItem(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                data[payload.environmentDetailOption].push(payload.item)
            }
        })

    },
    replaceEnvironmentsForSelectOptions(state, payload) {
        state.environmentsForSelectOptions = payload.data
    },
    editEnvironmentToArchive(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                data.active = false
            }
        })
    },
    editEnvironmentToRestore(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.environmentId) {
                data.active = true
            }
        })
    },
}

export default {
    getters,
    actions,
    mutations,
}