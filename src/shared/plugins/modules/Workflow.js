import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const pagination = require('./WorkflowPagination')

function sendResponse(response, message) {
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

    storages: [],
    selectedWorkflowId: '',
    
    searchTerm: '',
    filter: 'active',
    numberOfRows: 10,
    page: 0,
    editing: false,
    option: 'instance',
    workflowOrderDirection: 'descending',
    workflowOrderBy: 'createdAt',
})

const getters = {
    getField,
    ...pagination.getters,

}

const actions = {
    ...pagination.actions,

    async createWorkflow({ commit, state, rootState }, { projectId }) {
        try {
            const requestUrl = `${state.apiUrl}/create-workflow`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('addWorkflow', request.data)
            commit('editSelectedId', { selectedId: request.data._id })

            return sendResponse(request.data, 'Workflow created.')
        } catch(err) {
            return throwError(err)
        }
    },
    async listWorkflows({ commit, state, getters, rootState }, payload) {
        try {
            const projectId = payload.projectId
            const requestUrl = `${state.apiUrl}/list-workflows`
            const requestBody = { projectId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceWorkflows', { data: request.data })
            commit('resetPage')

            return sendResponse(request.data, 'Workflows loaded.')
        } catch(err) {
            return throwError(err)
        }
    },
    async getWorkflow({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/get-workflow`
            const requestBody = { projectId: payload.projectId, workflowId: payload.workflowId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('replaceWorkflows', { data: [request.data] })
            commit('resetPage')
            commit('editSelectedId', { selectedId: request.data._id })

            return sendResponse(request.data, 'Workflow found.')
        } catch(err) {
            return throwError(err)
        }
    },
    async cancelWorkflowChanges({ commit, state, getters, rootState }, { _id }) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/get-workflow`
            const requestBody = { workflowId: _id }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateWorkflow', request.data)
            commit('stopEditing')
            commit('updateForceComputedForWebhookCancelChanges')

            return sendResponse(request.data, 'Workflow changes cancelled.')
        } catch(err) {
            return throwError(err)
        }
    },
    async saveWorkflowChanges({ commit, state, getters, rootState }, payload) {
        try {
            if (!state.editing) return;

            const requestUrl = `${state.apiUrl}/save-workflow-changes`
            const requestBody = payload
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('stopEditing')

            return sendResponse(request.data, 'Workflow changes saved.')
        } catch(err) {
            return throwError(err)
        }
    },

    async addWorkflowTask({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/add-workflow-task`
            const requestBody = { _id: payload.workflowId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('updateWorkflow', request.data)

            return sendResponse(request.data, 'Workflow task added.')
        } catch(err) {
            return throwError(err)
        }
    },
    async deleteWorkflowTask({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/delete-workflow-task`
            const requestBody = { _id: payload.workflowId, taskId: payload.taskId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('removeWorkflowTask', { type: payload.type, taskId: payload.taskId, workflowId: payload.workflowId })

            return sendResponse(request.data, 'Workflow task deleted.')
        } catch(err) {
            return throwError(err)
        }
    },

    async returnWorkflow({ commit, state, getters, rootState }, workflowId) {
        try {
            const requestUrl = `${state.apiUrl}/return-workflow/${workflowId}`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Workflow returned.')
        } catch(err) {
            return throwError(err)
        }
    },
    async queueWorkflow({ commit, state, getters, rootState }, workflowId) {
        try {
            const requestUrl = `${state.apiUrl}/queue-workflow/${workflowId}`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Workflow queued.')
        } catch(err) {
            return throwError(err)
        }
    },
    async scheduleWorkflow({ commit, state, getters, rootState }, workflowId) {
        try {
            const requestUrl = `${state.apiUrl}/schedule-workflow/${workflowId}?date=${moment().add(1, 'minute').toISOString()}`
            const request = await Vue.$axios.post(requestUrl)

            return sendResponse(request.data, 'Workflow scheduled.')
        } catch(err) {
            return throwError(err)
        }
    },

    async archiveWorkflow({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/archive-workflow`
            const requestBody = { workflowId: payload.workflowId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editWorkflowToArchive', { workflowId: payload.workflowId })
            commit('editSelectedId', { selectedId: '' })

            return sendResponse(request.data, 'Workflow archived.')
        } catch(err) {
            return throwError(err)
        }
    },
    async restoreWorkflow({ commit, state, getters, rootState }, payload) {
        try {
            const requestUrl = `${state.apiUrl}/restore-workflow`
            const requestBody = { workflowId: payload.workflowId }
            const request = await Vue.$axios.post(requestUrl, requestBody)

            commit('editWorkflowToRestore', { workflowId: payload.workflowId })
            commit('editSelectedId', { selectedId: '' })

            return sendResponse(request.data, 'Workflow restored.')
        } catch(err) {
            return throwError(err)
        }
    },

    forceComputedForWebhookCancelChangesAction({ commit, state, getters, rootState }, payload) {
        return state.forceComputedForWebhookCancelChanges
    },
}

const mutations = {
    updateField,
    ...pagination.mutations,
    
    addWorkflow(state, payload) {
        state.workflows.push(payload)
    },
    updateForceComputedForWebhookCancelChanges(state, payload) {
        state.forceComputedForWebhookCancelChanges = state.forceComputedForWebhookCancelChanges + 1
    },
    updateWorkflow(state, payload) {
        _.each(state.workflows, (data) => {
            if (data._id === payload._id) {
                _.each(data, (value, key) => {
                    data[key] = payload[key]
                })
            }
        })
    },
    editWorkflowDetail(state, payload) {
        state.editing = true

        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                data[payload.key] = payload.value
            }
        })
    },
    editWorkflowWebhook(state, payload) {
        state.editing = true

        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                if (payload.value === '') {
                    data.webhooks = _.map(data.webhooks, (webhook) => {
                        delete webhook.requestId
                        return webhook
                    })
                } else {
                    data.webhooks = _.map(data.webhooks, (webhook) => {
                        webhook.requestId = payload.value
                        return webhook
                    })
                }
            }
        })
    },
    editWorkflowTask(state, payload) {
        state.editing = true

        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                _.each(data[payload.type], (obj) => {
                    if (obj._id === payload._id) {
                        obj[payload.key] = payload.value
                    }
                })
            }
        })
    },
    editWorkflowTaskInput(state, payload) {
        state.editing = true

        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                _.each(data.tasks, (taskObj) => {
                    if (taskObj._id === payload.taskId) {
                        if (!_.size(taskObj.inputs)) {
                            taskObj.inputs = {}
                        }
                        if (!_.size(taskObj.inputs[payload.input])) {
                            taskObj.inputs[payload.input] = {}
                        }
                        taskObj.inputs[payload.input][payload.inputKey] = payload.value
                    }
                })
            }
        })
    },
    updateWorkflowTask(state, payload) {
        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                data['tasks'].push(payload.item)
            }
        })

    },
    removeWorkflowTask(state, payload) {
        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                data[payload.type] = _.filter(data[payload.type], (obj) => {
                    if (obj._id === payload.taskId) return false;
                    else return true;
                })
            }
        })
    },
    editWorkflowToArchive(state, payload) {
        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                data.active = false
            }
        })
    },
    editWorkflowToRestore(state, payload) {
        _.each(state.workflows, (data) => {
            if (data._id === payload.workflowId) {
                data.active = true
            }
        })
    },
    changeTaskPosition(state, payload) {
        state.editing = true
        _.each(state.workflows, (data) => {
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
    },
    editSelectedWorkflowId(state, payload) {
        if (state.selectedWorkflowId === payload) {
            state.selectedWorkflowId = ''
        } else {
            state.selectedWorkflowId = payload
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}