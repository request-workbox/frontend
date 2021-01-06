
const getters = {
    allData: (state, getters) => () => {
        return state.projects
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
    // Step 2: Filter by project type
    visibleFilteredProjectType: (state, getters) => () => {
        return _.filter(getters.visibleFilteredStatus(), (data) => {
            if (state.projectOption === 'owner' && data.owner) return true
            else if (state.projectOption === 'team' && data.owner === false) return true
            else return false
        })
    },
    // Step 3: Sort data
    visibleSorted: (state, getters) => () => {
        return getters.visibleFilteredProjectType().sort(function compare(a, b) {
            var dateA = new Date(a[state.projectOrderBy])
            var dateB = new Date(b[state.projectOrderBy])
            if (state.projectOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.projectOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    // Step 4: Return data for this page
    visibleProjects: (state, getters) => () => {
        return getters.visibleSorted()
    },

    // Selected data helper
    selectedProject: (state, getters, rootState) => () => {
        if (state.selectedProjectId === '') return {}

       const foundData = _.filter(state.projects, (data) => {
            if (data._id === state.selectedProjectId) return true
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

        if (state.selectedProjectId === payload._id) {
            commit('editSelectedProjectId', '')
        } else {
            commit('editSelectedProjectId', payload._id)
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
        state.selectedProjectId = ''
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
        state.selectedProjectId = ''
    },
    // Option methods
    editOption(state, payload) {
        if (state.editing) return
        
        state.option = payload
    },
    // Change selected method
    editSelectedProjectId(state, payload) {
        if (state.editing) return
        
        state.selectedProjectId = payload
    },
    // Order direction methods
    updateProjectOrderDirection(state, payload) {
        if (state.editing) return

        state.orderDirection = payload.projectOrderDirection
        localStorage.setItem('projectOrderDirection', state.projectOrderDirection)
    },
    toggleProjectOrderDirection(state, payload) {
        if (state.editing) return

        state.page = 0
        state.selectedProjectId = ''

        if (state.projectOrderDirection === 'ascending') {
            state.projectOrderDirection = 'descending'
        } else if (state.projectOrderDirection === 'descending') {
            state.projectOrderDirection = 'ascending'
        }

        localStorage.setItem('projectOrderDirection', state.projectOrderDirection)
    },
}

export {
    getters,
    actions,
    mutations,
}