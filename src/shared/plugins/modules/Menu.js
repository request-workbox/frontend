import Vue from 'vue'

const appUrl = process.env.VUE_APP_APP_URL

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL
})

const getters = {

}

const actions = {
    async deleteEntireProject({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/delete-entire-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
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