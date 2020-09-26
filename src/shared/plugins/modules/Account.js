import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    option: 'user',
    userOption: 'login'
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
    changeAccountUserOption(state, userOption) {
        state.userOption = userOption
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}