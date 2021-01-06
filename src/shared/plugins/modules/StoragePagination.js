
const getters = {
    allData: (state, getters) => () => {
        return state.storages
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
            var dateA = new Date(a[state.storageOrderBy])
            var dateB = new Date(b[state.storageOrderBy])
            if (state.storageOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.storageOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    // Step 4: Chunk data
    visibleChunked: (state, getters) => () => {
        return _.chunk(getters.visibleSorted(), state.numberOfRows)
    },
    // Step 5: Return data for this page
    visibleStorages: (state, getters) => () => {
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
    selectedStorage: (state, getters, rootState) => () => {
        if (state.selectedStorageId === '') return {}

       const foundData = _.filter(state.storages, (data) => {
            if (data._id === state.selectedId) return true
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

        if (state.selectedId === payload._id) {
            commit('editSelectedStorageId', '')
        } else {
            commit('editSelectedStorageId', payload._id)
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
        state.selectedStorageId = ''
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
        state.selectedStorageId = ''
    },
    // Option methods
    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    // Change selected method
    editSelectedStorageId(state, payload) {
        if (state.editing) return
        
        state.selectedStorageId = payload
    },
    // Order direction methods
    updateStorageOrderDirection(state, payload) {
        if (state.editing) return

        state.storageOrderDirection = payload.storageOrderDirection
        localStorage.setItem('storageOrderDirection', state.storageOrderDirection)
    },
    toggleStorageOrderDirection(state, payload) {
        if (state.editing) return

        state.page = 0
        state.selectedId = ''

        if (state.storageOrderDirection === 'ascending') {
            state.storageOrderDirection = 'descending'
        } else if (state.storageOrderDirection === 'descending') {
            state.storageOrderDirection = 'ascending'
        }

        localStorage.setItem('storageOrderDirection', state.storageOrderDirection)
    },
}

export {
    getters,
    actions,
    mutations,
}