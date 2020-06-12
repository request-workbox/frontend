const state = () => ({
    currentPage: 0,
    totalPages: 0,
    filterBy: 'active',
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