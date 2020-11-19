import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    accountType: '',
    updateCardView: false,
    
    emailPromotions: null,
    emailProducts: null,
    emailSystemUpdates: null,
    globalWorkflowStatus: null,
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
    async getSettings({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/get-settings`
        const request = await Vue.$axios.post(requestUrl)
        commit('updateSettings', request.data)
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}