import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';

const state = () => ({
    apiUrl: 'http://localhost:3000',

    option: 'user'
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}