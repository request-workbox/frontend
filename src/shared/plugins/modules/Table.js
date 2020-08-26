import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'

import TableRequestModifiers from './TableRequestModifiers'
import TableWorkflowModifiers from './TableWorkflowModifiers'
import TableEnvironmentModifiers from './TableEnvironmentModifiers'
import TableStatisticModifiers from './TableStatisticModifiers'

const state = () => ({
    apiUrl: 'http://localhost:3000',

    selectedId: '',

    numberOfRows: 15,
    searchTerm: '',
    filter: 'active',
    allData: [],
    page: 0,
    editing: false,
    option: '',

    environmentsForSelectOptions: [],
    requestsForSelectOptions: [],

    currentRoute: ''
})

const getters = {
    getField,

    // GENERAL GETTERS
    pagination: (state, getters) => () => {
        return `${getters.currentPage()} / ${getters.totalPages()}`
    },
    currentPage: (state, getters) => () => {
        return (getters.totalPages() === 0) ? 0 : state.page + 1
    },
    totalPages: (state, getters) => () => {
        return getters.chunkedData().length
    },
    dataByCurrentRoute: (state, getters) => () => {
        return _.filter(state.allData, (data) => {
            if (state.currentRoute === 'Requests') {
                if (data.requestSettings.requestType === 'request') return true
                else return false
            } else if (state.currentRoute === 'Adapters') {
                if (data.requestSettings.requestType === 'adapter') return true
                else return false
            } else {
                return true
            }
        })
    },
    dataByFilter: (state, getters) => () => {
        return _.filter(getters.dataByCurrentRoute(), (data) => {
            if (state.filter === 'active') {
                if (data.active) return true
                else return false
            } else if (state.filter === 'archived') {
                if (!data.active) return true
                else return false
            }
        })
    },
    dataBySearchTerm: (state, getters) => () => {
        return _.filter(getters.dataByFilter(), (data) => {
            if (state.searchTerm === '') return true

            if (_.includes(data.url.url, state.searchTerm)) return true;
            else return false;
        })
    },
    reversedData: (state, getters) => () => {
        return _.reverse(getters.dataBySearchTerm())
    },
    chunkedData: (state, getters) => () => {
        return _.chunk(getters.reversedData(), state.numberOfRows)
    },
    viewableData: (state, getters) => () => {
        return getters.chunkedData()[state.page]
    },
    selectedData: (state, getters, rootState) => () => {
        if (state.selectedId === '') return {}

        return _.filter(state.allData, (data) => {
            if (data._id === state.selectedId) return true;
            else return false;
        })[0]
    },

    // REQUEST GETTERS
    ...TableRequestModifiers.getters,
    ...TableWorkflowModifiers.getters,
    ...TableEnvironmentModifiers.getters,
    ...TableStatisticModifiers.getters,
}

const actions = {
    // GENERAL ACTIONS
    previousPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() <= 1) return
        commit('decrementPage')
    },
    nextPage({ commit, state, getters, rootState }) {
        if (getters.currentPage() === getters.totalPages()) return
        commit('incrementPage')
    },
    async selectOrDeselectRow({ commit, state, getters, dispatch, rootState }, data) {
        if (state.editing) return;

        if (state.selectedId === data._id) {
            commit('changeSelectedId', { selectedId: '' })
        } else {
            commit('changeSelectedId', { selectedId: data._id })

            if (state.option === 'details') {
                const selectedData = getters['selectedData']()
                if (!selectedData.statistics) {
                    dispatch('getStatistics', { instanceId: data._id })
                }
            }
        }
    },

    // REQUEST ACTIONS
    ...TableRequestModifiers.actions,
    ...TableWorkflowModifiers.actions,
    ...TableEnvironmentModifiers.actions,
    ...TableStatisticModifiers.actions,
}

const mutations = {
    updateField,

    // GENERAL MUTATIONS
    setCurrentRoute(state, payload) {
        state.currentRoute = payload.route
    },
    resetPage(state) {
        state.page = 0
    },
    changeFilter(state, { filter }) {
        state.filter = filter
        state.page = 0
        state.selectedId = ''
    },
    stopEditing(state) {
        state.editing = false
    },
    decrementPage(state) {
        state.page--
    },
    incrementPage(state) {
        state.page++
    },
    changeOption(state, payload) {
        if (state.editing) return;
        
        state.option = payload
    },
    replaceAllData(state, { data }) {
        state.allData = data
    },
    changeSelectedId(state, { selectedId }) {
        state.selectedId = selectedId
    },

    // REQUEST MUTATIONS
    ...TableRequestModifiers.mutations,
    ...TableWorkflowModifiers.mutations,
    ...TableEnvironmentModifiers.mutations,
    ...TableStatisticModifiers.mutations,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}