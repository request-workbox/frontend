import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    projectId: '',
    intentType: '',
    product: '',
    price: '',
    paymentIntentId: '',
    coupon: '',
})

const getters = {

}

const actions = {
    async createSetupIntent({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/create-setup-intent`
        const request = await Vue.$axios.post(requestUrl)

        console.log(request)
        return request
    },
    async createPaymentIntentUpgrade({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/create-payment-intent-upgrade`
        const requestBody = {
            projectId: '',
            product: '',
            coupon: '',
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)

        console.log(request)
        return request
    },
    async createPaymentIntentDataTransfer({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/create-payment-intent-datatransfer`
        const requestBody = {
            projectId: '',
            product: '',
            coupon: '',
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)

        console.log(request)
        return request
    },
    async updatePaymentMethod({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/update-payment-method`
        const requestBody = {
            paymentMethodId: payload
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)

        console.log(request)
    },
    async removePaymentMethod({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/remove-payment-method`
        const request = await Vue.$axios.post(requestUrl)

        console.log(request)
    },
}

const mutations = {
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