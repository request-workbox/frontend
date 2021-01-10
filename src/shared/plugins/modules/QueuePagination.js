import moment from 'moment-timezone'

const getters = {
    allData: (state, getters) => () => {
        return state.queues
    },

    // Step 1: Filter by queue type
    filterByQueueType: (state, getters, rootState) => (workflowId) => {
        return _.filter(getters.allData(), (data) => {
            if (state.queueType === 'all') {
                return true
            } else if (state.queueType === 'return') {
                if (data.queueType === 'return') return true
                else return false
            } else if (state.queueType === 'queue') {
                if (data.queueType === 'queue') return true
                else return false
            } else if (state.queueType === 'schedule') {
                if (data.queueType === 'schedule') return true
                else return false
            }
        })
    },
    // Step 2: Filter by date
    visibleFilteredDay: (state, getters, rootState) => (workflowId) => {
        return _.filter(getters.filterByQueueType(workflowId), (data) => {
            const startOf = moment(state.queueDate).startOf('day')
            const endOf = moment(state.queueDate).endOf('day')
            if (moment(data.date).isBetween(startOf, endOf)) return true
            else return false
        })
    },
    // Step 3: Filter by status
    visibleFilteredStatus: (state, getters) => (workflowId) => {
        return _.filter(getters.visibleFilteredDay(workflowId), (data) => {
            if (state.queueStatus === 'all') {
                return true
            } else if (state.queueStatus === 'error') {
                if (data.status === 'error') return true
                else return false
            } else if (state.queueStatus === 'archived') {
                if (data.status === 'archived') return true
                else if (data.status === 'complete') return true
                else return false
            } else if (state.queueStatus === 'active') {
                if (data.status === 'received') return true
                else if (data.status === 'uploading') return true
                else if (data.status === 'pending') return true
                else if (data.status === 'queued') return true
                else if (data.status === 'starting') return true
                else if (data.status === 'initializing') return true
                else if (data.status === 'loading') return true
                else if (data.status === 'running') return true
                else return false
            }
        })
    },
    // Step 4: Filter by search term
    visibleFilteredSearch: (state, getters) => (workflowId) => {
        return _.filter(getters.visibleFilteredStatus(workflowId), (data) => {
            if (state.searchTerm === '') return true

            if (_.includes(_.lowerCase(data.name), _.lowerCase(state.searchTerm))) return true
            else return false
        })
    },
    // Step 5: Sort data
    visibleSorted: (state, getters) => (workflowId) => {
        return getters.visibleFilteredSearch(workflowId).sort(function compare(a, b) {
            var dateA = new Date(a[state.queueOrderBy])
            var dateB = new Date(b[state.queueOrderBy])
            if (state.queueOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.queueOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    // Step 6: Filter by workflow
    visibleFilteredWorkflow: (state, getters, rootState) => (workflowId) => {
        if (!workflowId) return []

        const workflows = _.filter(getters.visibleSorted(workflowId), (data) => {
            if (data.workflowId === workflowId) return true
            else return false
        })

        if (!_.size(workflows)) return []

        return workflows
    },
    // Step 7: Chunk data
    visibleChunked: (state, getters) => (workflowId) => {
        return _.chunk(getters.visibleFilteredWorkflow(workflowId), state.numberOfRows)
    },
    // Step 8: Return data for this page
    visibleQueues: (state, getters) => (workflowId) => {
        return getters.visibleChunked(workflowId)[state.page]
    },

    // Final number of pages
    totalPages: (state, getters) => () => {
        return getters.visibleChunked().length
    },
    // Friendly version of current page
    currentPage: (state, getters) => () => {
        return (getters.totalPages() === 0) ? 0 : state.page + 1
    },
    // Page state.
    pageState: (state, getters) => () => {
        return `${getters.currentPage()} / ${getters.totalPages()}`
    },

    // Selected data helper
    selectedQueue: (state, getters, rootState) => () => {
        if (state.selectedQueueId === '') return {}

       const foundData = _.filter(state.queues, (data) => {
            if (data._id === state.selectedQueueId) return true
            else return false
        })

        if (!_.size(foundData)) return {}

        return foundData[0]
    },

    // Helpers
    getQueuesByRequestId: (state, getters, rootState) => (requestId) => {
        if (!requestId) return {}

        const queues = _.filter(state.queues, (data) => {
            if (data.requestId === requestId) return true
            else return false
        })

        if (!_.size(queues)) return []

        return queues
    },
    getQueuesByWorkflowId: (state, getters, rootState) => (workflowId) => {
        if (!workflowId) return {}

        const queues = _.filter(state.queues, (data) => {
            if (data.workflowId === workflowId) return true
            else return false
        })

        if (!_.size(queues)) return []

        return queues
    },
    getQueueById: (state, getters, rootState) => (queueId) => {
        if (!queueId) return {}

        const queues = _.filter(state.queues, (data) => {
            if (data._id === queueId) return true
            else return false
        })

        if (!_.size(queues)) return {}

        return queues[0]
    },
    pendingQueues: (state, getters, rootState) => () => {
        const pendingObj = {
            total: 0, return: 0, queue: 0, schedule: 0,
        }

        if (!_.size(state.queues)) return false

        _.each(state.queues, (queue) => {
            if (queue.status === '' 
                || queue.status === 'received' 
                || queue.status === 'uploading' 
                || queue.status === 'pending' 
                || queue.status === 'queued' 
                || queue.status === 'starting' 
                || queue.status === 'initializing' 
                || queue.status === 'loading' 
                || queue.status === 'running') {
                    if (queue.queueType === 'return') {
                        pendingObj.return = pendingObj.return + 1
                    } else if (queue.queueType === 'queue') {
                        pendingObj.queue = pendingObj.queue + 1
                    } else if (queue.queueType === 'schedule') {
                        pendingObj.queue = pendingObj.schedule + 1
                    }
            }
        })

        pendingObj.total = pendingObj.return + pendingObj.queue + pendingObj.schedule

        return pendingObj
    },
}

const actions = {
    previousPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() <= 1) return
        commit('decrementPage')
    },
    nextPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() === getters.totalPages()) return
        commit('incrementPage')
    },
    async selectOrDeselectRow({ commit, state, getters, dispatch, rootState }, payload) {
        if (state.editing) return

        if (state.selectedQueueId === payload._id) {
            commit('editSelectedQueueId', '')
            // this.editSelectedInstanceId('')
            // this.editSelectedInstanceStatId('')
        } else {
            commit('editSelectedQueueId', payload._id)
        }
    },
}

const mutations = {
    // Edit methods
    stopEditing(state) {
        state.editing = false
    },
    // Page methods
    resetPage(state) {
        state.page = 0
        state.selectedQueueId = ''
    },
    decrementPage(state) {
        if (state.editing) return

        state.page--
    },
    incrementPage(state) {
        if (state.editing) return

        state.page++
    },
    // Filter methods
    changeFilter(state, payload) {
        if (state.editing) return

        state.filter = payload
        state.page = 0
        state.selectedQueueId = ''
    },
    // Option methods
    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    // Change selected method
    editSelectedQueueId(state, payload) {
        if (state.editing) return
        
        state.selectedQueueId = payload
    },
    updateQueueOrderDirection(state, payload) {
        state.queueOrderDirection = payload.queueOrderDirection

        localStorage.setItem('queueOrderDirection', state.queueOrderDirection)
    },
    updateQueueOrderBy(state, payload) {
        state.queueOrderBy = payload.queueOrderBy

        localStorage.setItem('queueOrderBy', state.queueOrderBy)
    },
    updateQueueOrderBy(state, payload) {
        if (state.queueOrderDirection === 'ascending') {
            state.queueOrderDirection = 'descending'
        } else if (state.queueOrderDirection === 'descending') {
            state.queueOrderDirection = 'ascending'
        }

        localStorage.setItem('queueOrderDirection', state.queueOrderDirection)
    },
}

export {
    getters,
    actions,
    mutations,
}