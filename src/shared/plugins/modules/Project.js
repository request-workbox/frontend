import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const pagination = require('./ProjectPagination')

function sendResponse(response, message) {
    console.log('response', JSON.parse(JSON.stringify(response)))
    console.log('message', message)
    if (message && message !== '') Vue.$toast.open({ message, })
    return response
}

function throwError(err) {
    if (err.request && err.request.responseText) {
        console.log(err.request.responseText)
        Vue.$toast.open({ message: err.request.responseText })
        throw new Error(err.request.responseText)
    } else {
        throw new Error(err.message)
    }
}

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    projects: [],
    selectedProjectId: '',
    
    searchTerm: '',
    filter: 'active',
    numberOfRows: 7,
    page: 0,
    editing: false,
    option: 'settings',
    projectOrderDirection: 'descending',
    projectOrderBy: 'createdAt',
    
    projectOption: 'owner',
})

const getters = {
    getField,
    ...pagination.getters,
}

const actions = {
    ...pagination.actions,
    async createProject({ commit, state, rootState }) {
        try {
            const requestUrl = `${state.apiUrl}/create-project`
            const request = await Vue.$axios.post(requestUrl)

            commit('addProject', request.data)

            return sendResponse(request.data, 'Project created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async listProjects({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/list-projects`
            const request = await Vue.$axios.post(requestUrl)

            commit('replaceProjects', request.data)

            return sendResponse(request.data, 'Projects loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getProject({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-project`
            const request = await Vue.$axios.post(requestUrl, payload)

            commit('addProject', request.data)
            commit('editSelectedProjectId', request.data._id)

            return sendResponse(request.data, 'Project found.')
        } catch(err) {
            return throwError(err)
        }
    },
    async cancelProjectChanges({ commit, state, getters, rootState }, { _id }) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/get-project`
            const requestBody = { projectId: _id }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateProject', request.data)
            commit('stopEditing')

            return sendResponse(request.data, 'Project changes cancelled.')
        } catch(err) {
            return throwError(err)
        }
    },
    async saveProjectChanges({ commit, state, getters, rootState }, project) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/update-project`
            const request = await Vue.$axios.post(requestUrl, project)
            
            commit('stopEditing')

            return sendResponse(request.data, 'Project changes saved.')
        } catch(err) {
            return throwError(err)
        }
    },
    async archiveProject({ commit, state, getters, rootState }, { projectId }) {
        try {
            const requestUrl = `${state.apiUrl}/archive-project`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editProjectToArchive', { projectId })
            commit('changeFilter', 'active')

            return sendResponse(request.data, 'Project archived.')
        } catch(err) {
            return throwError(err)
        }
    },
    async restoreProject({ commit, state, getters, rootState }, { projectId }) {
        try {
            const requestUrl = `${state.apiUrl}/restore-project`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editProjectToRestore', { projectId })
            commit('changeFilter', 'archived')

            return sendResponse(request.data, 'Project restored.')
        } catch(err) {
            return throwError(err)
        }
    },
}

const mutations = {
    updateField,
    ...pagination.mutations,
    
    addProject(state, payload) {
        const found = _.filter(state.projects, (data) => {
            if (data._id === payload._id) return true
            else return false
        })

        if (!_.size(found)) state.projects.push(payload)
    },
    replaceProjects(state, payload) {
        if (!payload || !_.size(payload)) return

        state.projects = payload
    },
    updateProject(state, payload) {
        state.projects = _.map(state.projects, (project) => {
            if (project._id === payload._id) return payload
            else return project
        })
    },
    editProjectName(state, payload) {
        state.editing = true
        state.projects = _.map(state.projects, (project) => {
            if (project._id === payload.projectId) {
                project.name = payload.value
            }
            return project
        })
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
    editPermissions(state, { permissionKey, projectId, value }) {
        state.editing = true
        state.projects = _.map(state.projects, (project) => {
            if (project._id === projectId) {
                project[permissionKey] = value
            }
            return project;
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