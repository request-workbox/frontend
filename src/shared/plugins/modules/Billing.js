import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    updateCardView: false,

    balance: 0,
    card: null,

    stripeCustomerId: '',
    
    tokens: [],
})

const getters = {

}

const actions = {
    async billingInformation({ commit, state, rootState }) {
        const requestUrl = `${state.billingUrl}/billing-information`
        const request = await Vue.$axios.post(requestUrl)

        commit('updateCard', request.data.card)
        commit('updateBalance', request.data.balance)
        commit('updateStripeCustomerId', request.data.stripeCustomerId)
    },
    async listTokens({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/list-tokens`
        const request = await Vue.$axios.post(requestUrl)

        commit('updateTokens', request.data)
    },
    async generateToken({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/generate-token`
        const request = await Vue.$axios.post(requestUrl)
        commit('addToken', request.data)
    },
    async revokeToken({ commit, state, rootState }, snippet) {
        const requestUrl = `${state.billingUrl}/revoke-token`
        const requestBody = { snippet,}
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeToken', snippet)
    },
}

const mutations = {
    updateStripeCustomerId(state, payload) {
        state.stripeCustomerId = payload
    },
    toggleUpdateCardView(state) {
        state.updateCardView = !state.updateCardView
    },
    updateCard(state, payload) {
        state.card = payload
    },
    updateBalance(state, payload) {
        state.balance = payload
    },
    updateTokens(state, payload) {
        state.tokens = payload
    },
    addToken(state, payload) {
        state.tokens.push({ snippet: payload })
    },
    removeToken(state, payload) {
        state.tokens = _.filter(state.tokens, (token) => {
            if (token.snippet === payload) return false
            else return true
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