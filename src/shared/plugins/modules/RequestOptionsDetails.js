const state = () => ({
    details: [{
        _id: '1',
        acceptInput: false,
        key: 'Request Type',
        value: 'y',
    }, {
            _id: '3',
            acceptInput: false,
            key: 'Plugin Type',
            value: 'y',
        }, {
            _id: '2',
            acceptInput: false,
            key: 'Success Codes',
            value: 'y',
        },
         {
            _id: '4',
            acceptInput: false,
            key: 'Error Codes',
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