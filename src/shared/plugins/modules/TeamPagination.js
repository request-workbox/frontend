
const getters = {
    allData: (state, getters) => () => {
        return state.team
    },

    // Step 1: Sort data
    visibleSorted: (state, getters) => () => {
        return getters.allData().sort(function compare(a, b) {
            var dateA = new Date(a[state.teamOrderBy])
            var dateB = new Date(b[state.teamOrderBy])
            if (state.teamOrderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.teamOrderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    // Step 2: Return data for this page
    visibleTeam: (state, getters) => () => {
        return getters.visibleSorted()
    },
}

const actions = {

}

const mutations = {
    
}

export {
    getters,
    actions,
    mutations,
}