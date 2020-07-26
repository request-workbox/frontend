import Vue from 'vue'

const state = () => ({
    apiUrl: 'http://localhost:3000',

    projectName: '',
    projectId: '',
})

const getters = {
    
}

const actions = {
    async getProjectName({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/get-project-name`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        const projectName = request.data.projectName
        commit('changeProjectId', { projectId })
        commit('changeProjectName', { projectName })
    },
    async updateProjectName({ commit, state, rootState }, { projectName }) {
        const requestUrl = `${state.apiUrl}/update-project-name`
        const requestBody = { projectId: state.projectId, projectName }
        await Vue.$axios.post(requestUrl, requestBody)
        commit('changeProjectName', { projectName })
    },
}

const mutations = {
    changeProjectId(state, { projectId }) {
        state.projectId = projectId
    },
    changeProjectName(state, { projectName }) {
        state.projectName = projectName
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}