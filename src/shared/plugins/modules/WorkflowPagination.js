
const getters = {
    allData: (state, getters) => () => {
        return state.workflows
    },

    // Step 1: Filter by status
    visibleFilteredStatus: (state, getters) => () => {
        return _.filter(getters.allData(), (data) => {
            if (state.filter === 'active') {
                if (data.active) return true
                else return false
            } else if (state.filter === 'archived') {
                if (data.active) return false
                else return true
            }
        })
    },
    // Step 2: Filter by search term
    visibleFilteredSearch: (state, getters) => () => {
        return _.filter(getters.visibleFilteredStatus(), (data) => {
            if (state.searchTerm === '') return true

            if (_.includes(_.lowerCase(data.name), _.lowerCase(state.searchTerm)) || 
                _.includes(_.lowerCase(data.url), _.lowerCase(state.searchTerm))) return true;
                else return false;
        })
    },
    // Step 3: Sort data
    visibleSorted: (state, getters) => () => {
        return getters.visibleFilteredSearch().sort(function compare(a, b) {
            var dateA = new Date(a[state.workflowOrderBy])
            var dateB = new Date(b[state.workflowOrderBy])
            if (state.workflowOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.workflowOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    // Step 4: Chunk data
    visibleChunked: (state, getters) => () => {
        return _.chunk(getters.visibleSorted(), state.numberOfRows)
    },
    // Step 5: Return data for this page
    visibleWorkflows: (state, getters) => () => {
        return getters.visibleChunked()[state.page]
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
    selectedWorkflow: (state, getters, rootState) => () => {
        if (state.selectedWorkflowId === '') return {}

       const foundData = _.filter(state.workflows, (data) => {
            if (data._id === state.selectedWorkflowId) return true
            else return false
        })

        if (!_.size(foundData)) return {}

        return foundData[0]
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

        if (state.selectedWorkflowId === payload._id) {
            commit('editSelectedWorkflowId', '')
        } else {
            commit('editSelectedWorkflowId', payload._id)
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
        state.selectedWorkflowId = ''
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
        state.selectedWorkflowId = ''
    },
    // Option methods
    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    // Change selected method
    editSelectedWorkflowId(state, payload) {
        if (state.editing) return
        
        state.selectedWorkflowId = payload
    },
    // Order direction methods
    updateWorkflowOrderDirection(state, payload) {
        if (state.editing) return

        state.workflowOrderDirection = payload.workflowOrderDirection
        localStorage.setItem('workflowOrderDirection', state.workflowOrderDirection)
    },
    toggleWorkflowOrderDirection(state, payload) {
        if (state.editing) return

        state.page = 0
        state.selectedWorkflowId = ''

        if (state.workflowOrderDirection === 'ascending') {
            state.workflowOrderDirection = 'descending'
        } else if (state.workflowOrderDirection === 'descending') {
            state.workflowOrderDirection = 'ascending'
        }

        localStorage.setItem('workflowOrderDirection', state.workflowOrderDirection)
    },
}

export {
    getters,
    actions,
    mutations,
}