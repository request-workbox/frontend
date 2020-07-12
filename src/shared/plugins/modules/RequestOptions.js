const state = () => ({
    option: 'url',
})

const getters = {

}

const actions = {

}

const mutations = {
    changeOption(state, payload) {
        state.option = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}