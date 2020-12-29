import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    checkoutType: '',

    checkoutPrice: '',
    checkoutDiscount: '',
    checkoutTotal: '',
    
    coupon: '',
})

const getters = {

}

const actions = {
    async createSetupIntent({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/create-setup-intent`
        const request = await Vue.$axios.post(requestUrl)
        return request
    },
    async updatePaymentMethod({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/update-payment-method`
        const requestBody = { paymentMethodId: payload }
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
    async removePaymentMethod({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/remove-payment-method`
        const request = await Vue.$axios.post(requestUrl)
    },
    async previewCheckoutPrice({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/preview-checkout-price`
        const requestBody = { checkoutType: payload.checkoutType, }
        if (payload.coupon) {
            requestBody.coupon = payload.coupon
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('changeCheckoutPrices', request.data)
    },
    async createSubscription({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/create-subscription`
        const requestBody = { checkoutType: payload.checkoutType, }
        if (payload.coupon) {
            requestBody.coupon = payload.coupon
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
}

const mutations = {
    changeCheckoutType(state, payload) {
        state.checkoutType = payload
    },
    changeCheckoutPrices(state, payload) {
        state.checkoutPrice = payload.checkoutPrice
        state.checkoutDiscount = payload.checkoutDiscount
        state.checkoutTotal = payload.checkoutTotal
    },
    updateCoupon(state, payload) {
        state.coupon = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}