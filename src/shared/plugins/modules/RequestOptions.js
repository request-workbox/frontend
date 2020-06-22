const state = () => ({
    option: 'parameters',
    // parameters: [],
    // query: [],
    // headers: [],
    // cookies: [],
    // body: [],

    // requestAvailableTo: '',
    // responseAvailableTo: '',

    // requestAvailableAs: '',
    // responseAvailableAs: '',

    // plugins: [],

    // requestName: '',
    // description: '',
    // successCodes: '',
    // errorCodes: '',
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