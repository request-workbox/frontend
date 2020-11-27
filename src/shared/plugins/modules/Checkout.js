import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    checkoutType: '',

    checkoutPrice: '',
    checkoutDiscount: '',
    checkoutTotal: '',
})

const getters = {

}

const actions = {
    async previewCheckoutPrice({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/preview-checkout-price`
        const requestBody = { checkoutType: payload }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('changeCheckoutPrices', request.data)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}