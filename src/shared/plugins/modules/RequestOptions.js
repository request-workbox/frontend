const state = () => ({
    parameters: [],
    query: [],
    headers: [],
    cookies: [],
    body: [],

    requestAvailableTo: '',
    responseAvailableTo: '',

    requestAvailableAs: '',
    responseAvailableAs: '',

    plugins: [],

    requestName: '',
    description: '',
    successCodes: '',
    errorCodes: '',
})

const getters = {

}

const actions = {

}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}