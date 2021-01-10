
const getters = {
    allData: (state, getters) => () => {
        return state.requests
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
            var dateA = new Date(a[state.requestOrderBy])
            var dateB = new Date(b[state.requestOrderBy])
            if (state.requestOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.requestOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    // Step 4: Chunk data
    visibleChunked: (state, getters) => () => {
        return _.chunk(getters.visibleSorted(), state.numberOfRows)
    },
    // Step 5: Return data for this page
    visibleRequests: (state, getters) => () => {
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
    selectedRequest: (state, getters, rootState) => () => {
        if (state.selectedRequestId === '') return {}

       const foundData = _.filter(state.requests, (data) => {
            if (data._id === state.selectedRequestId) return true
            else return false
        })

        if (!_.size(foundData)) return {}

        return foundData[0]
    },
}

const actions = {
    resetPage({ commit, state, getters, rootState }) {
        commit('resetPage')
    },
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

        if (state.selectedRequestId === payload._id) {
            commit('editSelectedRequestId', '')
        } else {
            commit('editSelectedRequestId', payload._id)
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
        state.selectedRequestId = ''
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
        state.selectedRequestId = ''
    },
    // Option methods
    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    // Change selected method
    editSelectedRequestId(state, payload) {
        if (state.editing) return
        
        state.selectedRequestId = payload
    },
    // Order direction methods
    updateRequestOrderDirection(state, payload) {
        if (state.editing) return

        state.requestOrderDirection = payload.requestOrderDirection
        localStorage.setItem('requestOrderDirection', state.requestOrderDirection)
    },
    toggleRequestOrderDirection(state, payload) {
        if (state.editing) return

        state.page = 0
        state.selectedRequestId = ''

        if (state.requestOrderDirection === 'ascending') {
            state.requestOrderDirection = 'descending'
        } else if (state.requestOrderDirection === 'descending') {
            state.requestOrderDirection = 'ascending'
        }

        localStorage.setItem('requestOrderDirection', state.requestOrderDirection)
    },
}

export {
    getters,
    actions,
    mutations,
}