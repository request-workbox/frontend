import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';

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