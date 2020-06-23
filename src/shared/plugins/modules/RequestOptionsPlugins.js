const state = () => ({
    plugins: [{
        _id: '1',
        acceptInput: false,
        key: 'request',
        value: 'Plugin Name',
    }, {
            _id: '3',
            acceptInput: false,
            key: 'response',
            value: 'Plugin Name',
        }]
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