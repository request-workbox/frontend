const state = () => ({
    projectName: '',
})

const getters = {
    
}

const actions = {
    async updateAction({ commit, state }, { projectName }) {
        console.log('new name', projectName)
        await Promise.resolve()
    }
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