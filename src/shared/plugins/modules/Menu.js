import Vue from 'vue'

const appUrl = process.env.VUE_APP_APP_URL

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL
})

const getters = {

}

const actions = {
    async newRequest({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/new-request`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return location.assign(`/projects/${projectId}/requests`)
    },
    async newWorkflow({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/new-workflow`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.assign(`/projects/${projectId}/workflows`)
    },
    async newProject({ commit, state, rootState }) {
        const requestUrl = `${state.apiUrl}/new-project`
        const request = await Vue.$axios.post(requestUrl)
        const projectId = request.data._id
        location.assign(`/projects/${projectId}/requests`)
    },
    async newStorage({ commit, state, rootState }, { projectId, storageType }) {
        const requestUrl = `${state.apiUrl}/new-storage`
        const requestBody = { projectId, storageType }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.assign(`/projects/${projectId}/storage`)
    },
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}