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
    apiUrl: process.env.VUE_APP_API_URL,

    displayForm: false,
    submitted: false,
})

const getters = {
    getField
}

const actions = {
    updateField,
    async submitFeedback({ commit, state, rootState }, payload) {
        try {
            const url = `${state.apiUrl}/submit-feedback`
            const body = payload
            const request = await Vue.$axios.post(url, body)
            
            commit('changeSubmitted', true)

            return sendResponse(request.data, 'Feedback submitted.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    changeDisplayForm(state, displayForm) {
        state.displayForm = displayForm
    },
    changeSubmitted(state, submitted) {
        state.submitted = submitted
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}