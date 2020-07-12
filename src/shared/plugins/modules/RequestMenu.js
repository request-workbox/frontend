import Vue from 'vue'

const appUrl = process.env.VUE_APP_APP_URL

const state = () => ({

})

const getters = {

}

const actions = {
    async newRequest({ commit, state, rootState }, { adapter }) {
        const { projectId } = rootState.request.requestProject
        const requestUrl = `${rootState.request.apiUrl}/new-request`
        const requestBody = { projectId, adapter }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return request.data._id
    },
    async newWorkflow({ commit, state, rootState }, { requestId }) {
        const requestUrl = `${rootState.request.apiUrl}/new-workflow`
        const requestBody = { requestId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        return request.data._id
    },
    async newProject({ commit, state, rootState }) {
        const requestUrl = `${rootState.request.apiUrl}/new-project`
        const request = await Vue.$axios.post(requestUrl)
        const projectId = request.data._id
        const redirectUrl = `${appUrl}/projects/${projectId}/requests`
        location.replace(redirectUrl)
    },
    // async addToWorkflow({ commit, state, rootState }, { requestId, workflowId }) {
    //     const requestUrl = `${rootState.request.apiUrl}/add-to-workflow`
    //     const requestBody = { requestId, workflowId }
    //     const request = await Vue.$axios.post(requestUrl, requestBody)
    //     return request.data._id
    // },
    async testRequest({ commit, state, rootState }, { requestId }) {
        const requestUrl = `${rootState.request.apiUrl}/test-request`
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