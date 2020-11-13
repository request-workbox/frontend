import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    accountType: '',
    updateCardView: false,
})

const getters = {

}

const actions = {
    async getAccountType({ commit, state, rootState }) {
        const requestUrl = `${state.billingUrl}/get-account-type`
        const request = await Vue.$axios.post(requestUrl)
        commit('changeAccountType', request.data)
    },
    async updateAccountType({ commit, state, rootState }, { accountType }) {
        const requestUrl = `${state.billingUrl}/update-account-type`
        const requestBody = { accountType }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
}

const mutations = {
    changeAccountType(state, { accountType }) {
        state.accountType = accountType
    },
    toggleUpdateCardView(state) {
        state.updateCardView = !state.updateCardView
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}