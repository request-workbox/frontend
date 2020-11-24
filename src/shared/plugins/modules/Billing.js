import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    accountType: '',
    updateCardView: false,
    
    emailPromotions: null,
    emailProducts: null,
    emailSystemUpdates: null,
    globalWorkflowStatus: null,

    balance: 0,
    card: null,
    
    tokens: [],
})

const getters = {

}

const actions = {
    // A single endpoint for getAccountType and getSettings
    async getAccountDetails({ commit, state, rootState }) {
        const requestUrl = `${state.billingUrl}/get-account-details`
        const request = await Vue.$axios.post(requestUrl)
        commit('changeAccountType', request.data)
        commit('updateSettings', request.data.setting)
        commit('updateCard', request.data.card)
        commit('updateBalance', request.data.balance)
        commit('updateTokens', request.data.tokens)
    },
    async updateAccountType({ commit, state, rootState }, { accountType }) {
        const requestUrl = `${state.billingUrl}/update-account-type`
        const requestBody = { accountType }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        location.reload()
    },
    async updateEmailAlert({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/update-email-alert`
        const requestBody = payload
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
    async updateGlobalWorkflowStatus({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/update-global-workflow-status`
        const requestBody = payload
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateWorkflowStatus', payload.globalWorkflowStatus)
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
    changeAccountType(state, { accountType }) {
        state.accountType = accountType
    },
    toggleUpdateCardView(state) {
        state.updateCardView = !state.updateCardView
    },
    updateSettings(state, payload) {
        state.emailPromotions = payload.emailPromotions
        state.emailProducts = payload.emailProducts
        state.emailSystemUpdates = payload.emailSystemUpdates
        state.globalWorkflowStatus = payload.globalWorkflowStatus
    },
    updateEmailPromotions(state, payload) {
        state.emailPromotions = payload
    },
    updateEmailProducts(state, payload) {
        state.emailProducts = payload
    },
    updateEmailSystemUpdates(state, payload) {
        state.emailSystemUpdates = payload
    },
    updateWorkflowStatus(state, payload) {
        state.globalWorkflowStatus = payload
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
        state.tokens.push({snippet: payload})
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