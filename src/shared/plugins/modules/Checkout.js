import Vue from 'vue'

const state = () => ({
    billingUrl: process.env.VUE_APP_BILLING_URL,

    
    intentType: '',
    product: '',
    projectId: '',
    projectName: '',

    price: '',
    paymentIntentId: '',
    client_secret: '',

    paymentIntentConfirmView: false,
    paymentIntentProcessingView: false,
    paymentIntentSuccessView: false,
    paymentIntentFailedView: false,
})

const getters = {

}

const actions = {
    async createSetupIntent({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/create-setup-intent`
        const request = await Vue.$axios.post(requestUrl)
        return request
    },
    async createPaymentIntentUpgrade({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/create-payment-intent-upgrade`
            const requestBody = {
                projectId: payload.projectId || state.projectId,
                product: payload.product || state.product,
                coupon: payload.coupon,
            }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updatePaymentIntentId', request.data.paymentIntentId)
            commit('updatePrice', request.data.price)
            commit('updateClientSecret', request.data.client_secret)
            return request.data
        } catch(err) {
            throw new Error(err.request.responseText)
        }
    },
    async createPaymentIntentDataTransfer({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/create-payment-intent-datatransfer`
            const requestBody = {
                projectId: payload.projectId || state.projectId,
                product: payload.product || state.product,
                coupon: payload.coupon,
            }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updatePaymentIntentId', request.data.paymentIntentId)
            commit('updatePrice', request.data.price)
            commit('updateClientSecret', request.data.client_secret)
            return request.data
        } catch(err) {
            throw new Error(err.request.responseText)
        }
    },
    async confirmPaymentIntent({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/confirm-payment-intent`
        const requestBody = {
            paymentIntentId: state.paymentIntentId,
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)

        if (request.data && request.data.paymentMethod) return request.data.paymentMethod
        else throw new Error('Payment method not found.')
    },
    async updatePaymentMethod({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/update-payment-method`
        const requestBody = {
            paymentMethodId: payload
        }
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
    async removePaymentMethod({ commit, state, rootState }, payload) {
        const requestUrl = `${state.billingUrl}/remove-payment-method`
        const request = await Vue.$axios.post(requestUrl)
    },
}

const mutations = {
    updateIntentType(state, payload) {
        state.intentType = payload
    },
    updateProduct(state, payload) {
        state.product = payload
    },
    updateProjectId(state, payload) {
        state.projectId = payload
    },
    updateProjectName(state, payload) {
        state.projectName = payload
    },
    updatePaymentIntentId(state, payload) {
        state.paymentIntentId = payload
    },
    updatePrice(state, payload) {
        state.price = payload
    },
    updateClientSecret(state, payload) {
        state.client_secret = payload
    },
    togglePaymentIntentConfirmView(state, payload) {
        state.paymentIntentConfirmView = !state.paymentIntentConfirmView
    },
    togglePaymentIntentProcessingView(state, payload) {
        state.paymentIntentProcessingView = !state.paymentIntentProcessingView
    },
    togglePaymentIntentSuccessView(state, payload) {
        state.paymentIntentSuccessView = !state.paymentIntentSuccessView
    },
    togglePaymentIntentFailedView(state, payload) {
        state.paymentIntentFailedView = !state.paymentIntentFailedView
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}