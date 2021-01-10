import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

function sendResponse(response, message) {
    console.log('response', JSON.parse(JSON.stringify(response)))
    console.log('message', message)
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
        try {
            const requestUrl = `${state.billingUrl}/billing-information`
            const request = await Vue.$axios.post(requestUrl)

            commit('updateStripeCardBrand', request.data.stripeCardBrand)
            commit('updateStripeCardLast4', request.data.stripeCardLast4)
            commit('updateBalance', request.data.balance)

            return sendResponse(request.data, 'Billing information loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async listTokens({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/list-tokens`
            const request = await Vue.$axios.post(requestUrl)

            commit('updateTokens', request.data)

            return sendResponse(request.data, 'Tokens loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async generateToken({ commit, state, rootState }, payload) {
        try {
            const requestUrl = `${state.billingUrl}/generate-token`
            const request = await Vue.$axios.post(requestUrl)

            commit('addToken', request.data)

            return sendResponse(request.data, 'Token generated.')
        } catch(err) {
            return throwError(err)
        }
    },
    async revokeToken({ commit, state, rootState }, snippet) {
        try {
            const requestUrl = `${state.billingUrl}/revoke-token`
            const requestBody = { snippet,}
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('removeToken', snippet)

            return sendResponse(request.data, 'Token revoked.')
        } catch(err) {
            return throwError(err)
        }
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