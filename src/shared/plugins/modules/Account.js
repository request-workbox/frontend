import Vue from 'vue'

const state = () => ({
    apiUrl: 'http://localhost:3000',

    option: 'billing'
})

const getters = {

}

const actions = {

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