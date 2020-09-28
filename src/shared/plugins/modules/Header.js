import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';

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
            await Vue.$axios.post(url, body)
            
            commit('changeSubmitted', true)
        } catch(err) {
            console.log(err)
            throw new Error(err)
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