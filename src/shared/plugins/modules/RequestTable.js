import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'

const state = () => ({
    numberOfRows: 5,
    page: 0,
    
    filter: 'active',

    allRequests: [{ isActive: false }],

    requestId: '',

    searchTerm: '',
})

const getters = {
    getField,
    currentPage: (state, getters) => () => {
        return (getters.totalPages() === 0) ? 0 : state.page + 1
    },
    totalPages: (state, getters) => () => {
        return getters.chunkedRequests().length
    },
    pagination: (state, getters) => () => {
        return `${getters.currentPage()} / ${getters.totalPages()}`
    },

    requestsByFilter: (state, getters) => () => {
        return _.filter(state.allRequests, (request) => {
            if (state.filter === 'active') {
                if (request.isActive) return true
                else return false
            } else if (state.filter === 'deleted') {
                if (!request.isActive) return true
                else return false
            } else {
                return true
            }
        })
    },
    requestsBySearchTerm: (state, getters) => () => {
        return _.filter(getters.requestsByFilter(), (request) => {
            if (state.searchTerm === '') return true

            if (_.includes(request.url, state.searchTerm)) return true;
            else return false;
        })
    },
    chunkedRequests: (state, getters) => () => {
        return _.chunk(getters.requestsBySearchTerm(), state.numberOfRows)
    },
    viewableRequests: (state, getters) => () => {
        return getters.chunkedRequests()[state.page]
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
    async getRequests({ commit, state, getters, rootState }, { projectId }) {
        console.log('getting requests')
        const requestUrl = `${rootState.request.apiUrl}/get-requests`
        const requestBody = { projectId }
        const request = await Vue.$axios.post(requestUrl, requestBody)
        console.log(request.data)
        return request.data
    }
}

const mutations = {
    updateField,
    decrementPage(state) {
        state.page--
    },
    incrementPage(state) {
        state.page++
    },
    changeFilter(state, { filter }) {
        state.filter = filter
        state.page = 0
    },
    resetPage(state) {
        state.page = 0
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}