import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'
import moment from 'moment-timezone'

import TableRequestModifiers from './TableRequestModifiers'
import TableWorkflowModifiers from './TableWorkflowModifiers'
import TableStorageModifiers from './TableStorageModifiers'
import TableStatisticModifiers from './TableStatisticModifiers'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

    selectedId: '',

    numberOfRows: 6,
    searchTerm: '',
    filter: 'active',
    allData: [],
    page: 0,
    editing: false,
    option: '',

    requestsForSelectOptions: [],
    storagesForSelectOptions: [],

    currentRoute: '',

    selectedStatId: '',
    selectedQueueStatId: '',

    orderDirection: 'descending',
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
    dataByFilter: (state, getters) => () => {
        return _.filter(state.allData, (data) => {
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

            if (state.currentRoute === 'Requests') {
                if (_.includes(data.url.name, state.searchTerm) || _.includes(data.url.url, state.searchTerm)) return true;
                else return false;
            } else if (state.currentRoute === 'Workflows') {
                if (_.includes(data.name, state.searchTerm)) return true;
                else return false;
            } else if (state.currentRoute === 'Storage') {
                if (_.includes(data.name, state.searchTerm) || _.includes(data.storageType, state.searchTerm)) return true;
                else return false;
            } else if (state.currentRoute === 'Statistics') {
                if (_.includes(data.workflowName, state.searchTerm) || _.includes(data._id, state.searchTerm)) return true;
                else return false;
            }
        })
    },
    sortedData: (state, getters) => () => {
        return getters.dataBySearchTerm().sort(function compare(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            if (state.orderDirection === 'ascending') {
                return dateA - dateB
            } else if (state.orderDirection === 'descending') {
                return dateB - dateA
            }
        })
    },
    chunkedData: (state, getters) => () => {
        return _.chunk(getters.sortedData(), state.numberOfRows)
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
    ...TableStatisticModifiers.getters,
    ...TableStorageModifiers.getters,
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
            if (state.currentRoute === 'Statistics') commit('changeSelectedStatId', '')
        } else {
            commit('changeSelectedId', { selectedId: data._id })
            if (state.currentRoute === 'Statistics') {
                const firstStatId = getters.firstStatId(data._id)
                commit('changeSelectedStatId', firstStatId)
            }
        }

        if (state.currentRoute === 'Workflows') commit('changeSelectedQueueStatId', '')
    },

    // REQUEST ACTIONS
    ...TableRequestModifiers.actions,
    ...TableWorkflowModifiers.actions,
    ...TableStatisticModifiers.actions,
    ...TableStorageModifiers.actions,
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
    updateSearchTerm(state, payload) {
        state.searchTerm = payload
    },
    updateOrderDirection(state, payload) {
        state.orderDirection = payload.orderDirection
        localStorage.setItem('orderDirection', state.orderDirection)
    },
    toggleOrderDirection(state, payload) {
        if (state.orderDirection === 'ascending') {
            state.orderDirection = 'descending'
        } else if (state.orderDirection === 'descending') {
            state.orderDirection = 'ascending'
        }

        localStorage.setItem('orderDirection', state.orderDirection)
    },

    // REQUEST MUTATIONS
    ...TableRequestModifiers.mutations,
    ...TableWorkflowModifiers.mutations,
    ...TableStatisticModifiers.mutations,
    ...TableStorageModifiers.mutations,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}