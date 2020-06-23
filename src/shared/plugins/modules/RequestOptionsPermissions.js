const state = () => ({
    permissions: [{
        _id: '1',
        acceptInput: false,
        key: 'Request Available To',
        value: 'y',
    }, {
            _id: '3',
            acceptInput: false,
            key: 'Response Available To',
            value: 'y',
        }, {
            _id: '2',
            acceptInput: false,
            key: 'Request Available As',
            value: 'y',
        },
         {
            _id: '4',
            acceptInput: false,
            key: 'Response Available As',
            value: 'y',
        },]
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