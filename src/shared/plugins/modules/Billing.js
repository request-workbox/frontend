import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    updateCardView: false,

    stripeCardBrand: null,
    stripeCardLast4: null,
    balance: 0,
    
    tokens: [],
})

const getters = {

}

const actions = {
    async billingInformation({ commit, state, rootState }) {
        const requestUrl = `${state.billingUrl}/billing-information`
        const request = await Vue.$axios.post(requestUrl)

        commit('updateStripeCardBrand', request.data.stripeCardBrand)
        commit('updateStripeCardLast4', request.data.stripeCardLast4)
        commit('updateBalance', request.data.balance)
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
    toggleUpdateCardView(state) {
        state.updateCardView = !state.updateCardView
    },
    updateStripeCardBrand(state, payload) {
        state.stripeCardBrand = payload
    },
    updateStripeCardLast4(state, payload) {
        state.stripeCardLast4 = payload
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