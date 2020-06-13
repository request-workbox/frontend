import Vue from 'vue'

const state = () => ({

})

const getters = {

}

const actions = {
    async newRequest({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${rootState.request.apiUrl}/new-request`
        const requestBody = { projectId }
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
        return request.data._id
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