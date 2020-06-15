import requestProject from './RequestProject'
import requestMenu from './RequestMenu'
import requestTable from './RequestTable'

const state = () => ({
    apiUrl: 'http://localhost:3000'
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
    mutations,
    modules: {
        requestProject,
        requestMenu,
        requestTable,
    }
}