import Vue from 'vue'
import _ from 'lodash'



const getters = {
    // WORKFLOW GETTERS
}

const actions = {
    // WORKFLOW ACTIONS
    async getWorkflows({ commit, state, getters, rootState }, payload) {
        const projectId = payload.projectId
        const requestUrl = `${state.apiUrl}/get-workflows`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('replaceAllData', { data: request.data })
        commit('resetPage')
    },
    async cancelWorkflowChanges({ commit, state, getters, rootState }, { _id }) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/get-workflow-details`
        const requestBody = { workflowId: _id }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateWorkflow', request.data)
        commit('stopEditing')
    },
    async saveWorkflowChanges({ commit, state, getters, rootState }, workflow) {
        if (!state.editing) return;

        const requestUrl = `${state.apiUrl}/save-workflow-changes`
        const requestBody = workflow
        await Vue.$axios.post(requestUrl, requestBody)
        commit('stopEditing')
    },
    async addWorkflowTask({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/add-workflow-task`
        const requestBody = { _id: payload.workflowId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('updateWorkflowTask', { item: request.data, workflowId: payload.workflowId })
    },
    async deleteWorkflowTask({ commit, state, getters, rootState }, payload) {
        const requestUrl = `${state.apiUrl}/delete-workflow-task`
        const requestBody = { _id: payload.workflowId, taskId: payload.taskId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        commit('removeWorkflowTask', { type: payload.type, taskId: payload.taskId, workflowId: payload.workflowId })
    },
}

const mutations = {
    // WORKFLOW MUTATIONS
    updateWorkflow(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editWorkflowDetail(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.workflowId) {
                data[payload.key] = payload.value
            }
        })
    },
    editWorkflowTask(state, payload) {
        state.editing = true

        _.each(state.allData, (data) => {
            if (data._id === payload.workflowId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload._id) {
                        obj[payload.key] = payload.value
                    }
                })
            }
        })
    },
    updateWorkflowTask(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.workflowId) {
                data['tasks'].push(payload.item)
            }
        })

    },
    removeWorkflowTask(state, payload) {
        _.each(state.allData, (data) => {
            if (data._id === payload.workflowId) {
                data[payload.type] = _.filter(data[payload.type], (obj) => {
                    if (obj._id === payload.taskId) return false;
                    else return true;
                })
            }
        })
    },
    changeTaskPosition(state, payload) {
        state.editing = true
        _.each(state.allData, (data) => {
            if (data._id === payload.workflowId) {
                // find current position
                let newPosition;
                let updatedArraySize;
                _.each(data.tasks, (obj, key) => {
                    if (obj._id === payload.taskId) {
                        newPosition = key - 1
                    }
                })
                // remove task
                const task  = _.remove(data.tasks, (obj) => {
                    if (obj._id === payload.taskId) return true;
                    else return false;
                })[0]
                // update task array
                const updatedTasks = _.filter(data.tasks, (obj) => {
                    if (obj._id === payload.taskId) return false;
                    else return true;
                })
                // empty tasks
                data.tasks = []
                // get current array size
                updatedArraySize = _.size(updatedTasks)
                // insert at new position if not last
                _.each(updatedTasks, (obj, key) => {
                    if (key === (newPosition)) {
                        data.tasks.push(task)
                    }
                    data.tasks.push(obj)
                })
                // insert at new position if last
                if (newPosition === -1) {
                    data.tasks.push(task)
                }
            }
        })
    }
}

export default {
    getters,
    actions,
    mutations,
}