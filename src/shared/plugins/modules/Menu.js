import Vue from 'vue'

const appUrl = process.env.VUE_APP_APP_URL

const state = () => ({
    apiUrl: 'http://localhost:3000'
})

const getters = {

}

const actions = {
    async newRequest({ commit, state, rootState }, { adapter, projectId }) {
        const requestUrl = `${state.apiUrl}/new-request`
        const requestBody = { projectId, adapter }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
    async newWorkflow({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/new-workflow`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
    async newProject({ commit, state, rootState }) {
        const requestUrl = `${state.apiUrl}/new-project`
        const request = await Vue.$axios.post(requestUrl)
        const projectId = request.data._id
        location.assign(`/projects/${projectId}/requests`)
    },
    // async addToWorkflow({ commit, state, rootState }, { requestId, workflowId }) {
    //     const requestUrl = `${state.apiUrl}/add-to-workflow`
    //     const requestBody = { requestId, workflowId }
    //     const request = await Vue.$axios.post(requestUrl, requestBody)
    //     return request.data._id
    // },
    async testRequest({ commit, state, rootState }, { requestId }) {
        const requestUrl = `${state.apiUrl}/test-request`
        const requestBody = { requestId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return request.data._id
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


// status, statusText, data