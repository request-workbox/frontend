import Vue from 'vue'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    projectName: '',
    projectId: '',

    projects: []
})

const getters = {
    filteredData: (state, getters) => () => {
        return _.filter(state.projects, (project) => {
            if (project.active) return true
            else return false
        })
    },
    viewableData: (state, getters) => () => {
        return _.reverse(getters.filteredData())
    },
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
    async getProjects({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/get-projects`
        const request = await Vue.$axios.post(requestUrl)
        commit('changeProjects', request.data)
    },
}

const mutations = {
    changeProjectId(state, { projectId }) {
        state.projectId = projectId
    },
    changeProjectName(state, { projectName }) {
        state.projectName = projectName
    },
    changeProjects(state, payload) {
        state.projects = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}