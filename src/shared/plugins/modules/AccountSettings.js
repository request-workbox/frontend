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

    option: 'settings',
})

const getters = {
    getField
}

const actions = {
    updateField
}

const mutations = {
    changeAccountOption(state, option) {
        state.option = option
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}