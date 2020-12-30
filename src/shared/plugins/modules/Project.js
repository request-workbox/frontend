import Vue from 'vue'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    projectName: '',
    projectId: '',

    projects: [],
    
    filter: 'active',

    option: 'settings',

    projectTypeOption: 'owner',

    orderDirection: 'descending',

    editing: false,

    team: [],
    invites: [],
})

const getters = {
    filteredData: (state, getters) => () => {
        return _.filter(state.projects, (data) => {
            if (state.filter === 'active') {
                if (data.active) return true
                else return false
            } else if (state.filter === 'archived') {
                if (!data.active) return true
                else return false
            }
        })

    },
    sortedData: (state, getters) => () => {
        return getters.filteredData().sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            if (state.orderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.orderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    finalData: (state, getters) => (projectTypeOption) => {
        return _.filter(getters.sortedData(), (project) => {
            if (projectTypeOption === 'owner' && project.owner) return true
            else if (projectTypeOption === 'team' && project.owner === false) return true
            else return false
        })
    },
    ownerData: (state, getters) => (projectTypeOption) => {
        return _.filter(getters.sortedData(), (project) => {
            if (project.owner) return true
            else return false
        })
    },
    selectedData: (state, getters, rootState) => () => {
        if (state.projectId === '') return {}

        return _.filter(state.projects, (project) => {
            if (project._id === state.projectId) return true;
            else return false;
        })[0]
    },

    teamData: (state, getters) => () => {
        return _.map(state.team).sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            if (state.orderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.orderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    inviteData: (state, getters) => () => {
        return _.map(state.invites).sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            if (state.orderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.orderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
}

const actions = {
    async listTeam({ commit, state, rootState }, payload) {

        const requestUrl = `${state.apiUrl}/list-team`
        const requestBody = { projectId: payload }
        const request = await Vue.$axios.post(requestUrl, requestBody)

        commit('updateTeam', request.data)
        commit('stopEditing')
    },
    async updateTeam({ commit, state, rootState }, projectId) {

        const requestUrl = `${state.apiUrl}/update-team`
        const requestBody = { team: state.team, projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)

        commit('stopEditing')
    },
    async listInvites({ commit, state, rootState }, payload) {
        if (state.editing) return

        const requestUrl = `${state.apiUrl}/list-invites`
        const request = await Vue.$axios.post(requestUrl)

        commit('updateInvites', request.data)
    },
    async createInvite({ commit, state, rootState }, { projectId, username }) {
        const requestUrl = `${state.apiUrl}/create-invite`
        const requestBody = { projectId, username }
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
    async acceptInvite({ commit, state, rootState }, projectId) {
        const requestUrl = `${state.apiUrl}/accept-invite`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
    async removeInvite({ commit, state, rootState }, { projectId, username }) {
        const requestUrl = `${state.apiUrl}/remove-invite`
        const requestBody = { projectId, username }
        const request = await Vue.$axios.post(requestUrl, requestBody)
    },
    async createProject({ commit, state, rootState }) {
        const requestUrl = `${state.apiUrl}/create-project`
        const request = await Vue.$axios.post(requestUrl)

        commit('addProject', request.data)
        commit('changeProjectId', { projectId: request.data._id })
        Vue.$toast.open({ message: 'Project created', type: 'info' })
    },
    async getProjectName({ commit, state, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/get-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('changeProjectId', { projectId: request.data._id })
        commit('updateProjectName', { projectName: request.data.name })
    },
    async getProjects({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/list-projects`
        const request = await Vue.$axios.post(requestUrl)
        commit('changeProjects', request.data)
    },
    async cancelProjectChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-project`
        const requestBody = { projectId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateProject', request.data)
        commit('stopEditing')
    },
    async saveProjectChanges({ commit, state, getters, rootState }, project) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/update-project`
            await Vue.$axios.post(requestUrl, project)
            commit('stopEditing')
        } catch(err) {
            if (err.response && err.response.data) {
                throw new Error(err.response.data)
            }
        }
    },
    async archiveProject({ commit, state, getters, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/archive-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editProjectToArchive', { projectId })
        commit('changeFilter', { filter: 'active' })

        Vue.$toast.open({ message: 'Archived', type: 'info' })
    },
    async restoreProject({ commit, state, getters, rootState }, { projectId }) {
        const requestUrl = `${state.apiUrl}/restore-project`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('editProjectToRestore', { projectId })
        commit('changeFilter', { filter: 'archived' })

        Vue.$toast.open({ message: 'Restored', type: 'info' })
    },
}

const mutations = {
    addProject(state, project) {
        state.projects.push(project)

        state.projects = _.map(state.projects).sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            
            return dateB - dateA
        })
    },
    updateTeam(state, payload) {
        state.team = payload
    },
    updateInvites(state, payload) {
        state.invites = payload
    },
    updateProject(state, payload) {
        state.projects = _.map(state.projects, (project) => {
            if (project._id === payload._id) return payload
            else return project
        })
    },
    updateIncludeSensitive(state, { memberId, value }) {
        state.editing = true

        state.team = _.map(state.team, (member) => {
            if (member._id === memberId) {
                member.includeSensitive = value
            }

            return member
        })
    },
    updatePermission(state, { memberId, value }) {
        state.editing = true

        state.team = _.map(state.team, (member) => {
            if (member._id === memberId) {
                member.permission = value
            }

            return member
        })
    },
    stopEditing(state, option) {
        state.editing = false
    },
    changeOption(state, option) {
        if (state.editing) return

        state.option = option
    },
    changeProjectId(state, { projectId }) {
        if (state.editing) return

        state.projectId = projectId
    },
    changeProjectName(state, { value, projectId }) {
        state.editing = true
        
        state.projects = _.map(state.projects, (project) => {
            if (project._id === projectId) project.name = value
            return project;
        })
    },
    updateProjectName(state, payload) {
        state.projectName = payload.projectName
    },
    changePermissions(state, { permissionKey, projectId, value }) {
        state.editing = true
        state.projects = _.map(state.projects, (project) => {
            if (project._id === projectId) {
                project[permissionKey] = value
            }
            return project;
        })
    },
    changeProjects(state, payload) {
        if (!payload || !_.size(payload)) return

        state.projects = payload
    },
    changeFilter(state, { filter }) {
        if (state.editing) return

        state.filter = filter
        state.projectId = ''
    },
    changeProjectTypeOption(state, payload) {
        if (state.editing) return

        state.projectTypeOption = payload
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