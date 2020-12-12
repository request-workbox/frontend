import Vue from 'vue'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    projectName: '',
    projectId: '',

    projects: [],
    
    filter: 'active',
})

const getters = {
    viewableData: (state, getters) => () => {
        return state.projects
        return _.reverse(state.projects)
    },
    sortedData: (state, getters) => () => {
        return _.filter(getters.viewableData(), (data) => {
            if (state.filter === 'active') {
                if (data.active) return true
                else return false
            } else if (state.filter === 'archived') {
                if (!data.active) return true
                else return false
            }
        })
    },
}

const actions = {
    async getProjectName({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/get-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('changeProjectId', { projectId: request.data._id })
        commit('changeProjectName', { projectName: request.data.name })
    },
    async updateProjectName({ commit, state, rootState }, { projectName }) {
        const requestUrl = `${state.apiUrl}/update-project`
        const requestBody = { projectId: state.projectId, name: projectName }
        await Vue.$axios.post(requestUrl, requestBody)
        commit('changeProjectName', { projectName })
    },
    async getProjects({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/list-projects`
        const request = await Vue.$axios.post(requestUrl)
        commit('changeProjects', request.data)
    },
    async archiveProject({ commit, state, getters, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/archive-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editProjectToArchive', { projectId })
        commit('changeFilter', { filter: 'active' })
    },
    async restoreProject({ commit, state, getters, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/restore-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editProjectToRestore', { projectId })
        commit('changeFilter', { filter: 'archived' })
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
    },
    changeFilter(state, { filter }) {
        state.filter = filter
        state.projectId = ''
    },
    editProjectToArchive(state, payload) {
        _.each(state.projects, (data) => {
            if (data._id === payload.projectId) {
                data.active = false
            }
        })
    },
    editProjectToRestore(state, payload) {
        _.each(state.projects, (data) => {
            if (data._id === payload.projectId) {
                data.active = true
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}