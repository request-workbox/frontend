import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

function sendResponse(response, message) {
    if (message && message !== '') Vue.$toast.open({ message, })
    return response
}

function throwError(err) {
    if (err.request && err.request.responseText) {
        console.log(err.request.responseText)
        Vue.$toast.open({ message: err.request.responseText })
        throw new Error(err.request.responseText)
    } else {
        throw new Error(err.message)
    }
}

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
        try {
            const requestUrl = `${state.billingUrl}/create-setup-intent`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Created setup intent.')
        } catch(err) {
            return throwError(err)
        }
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

            return sendResponse(request.data, 'Created payment intent upgrade.')
        } catch(err) {
            return throwError(err)
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

            return sendResponse(request.data, 'Created payment intent data transfer.')
        } catch(err) {
            return throwError(err)
        }
    },
    async confirmPaymentIntent({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/confirm-payment-intent`
            const requestBody = {
                paymentIntentId: state.paymentIntentId,
            }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            return sendResponse(request.data, 'Confirmed payment intent.')
        } catch(err) {
            return throwError(err)
        }
    },
    async updatePaymentMethod({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/update-payment-method`
            const requestBody = {
                paymentMethodId: payload
            }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            return sendResponse(request.data, 'Payment method updated.')
        } catch(err) {
            return throwError(err)
        }
    },
    async removePaymentMethod({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/remove-payment-method`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Payment method removed.')
        } catch(err) {
            return throwError(err)
        }
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