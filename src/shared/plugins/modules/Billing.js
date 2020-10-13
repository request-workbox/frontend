import Vue from 'vue'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    accountType: '',
})

const getters = {

}

const actions = {
    async getAccountType({ commit, state, rootState }) {
        const requestUrl = `${state.apiUrl}/get-account-type`
        const request = await Vue.$axios.post(requestUrl)
        commit('changeAccountType', request.data)
    },
    async updateAccountType({ commit, state, rootState }, { accountType }) {
        const requestUrl = `${state.apiUrl}/update-account-type`
        const requestBody = { accountType }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
}

const mutations = {
    changeAccountType(state, { accountType }) {
        state.accountType = accountType
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}