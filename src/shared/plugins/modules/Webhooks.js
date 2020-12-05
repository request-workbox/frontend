import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields';
import _ from 'lodash'
import moment from 'moment-timezone'

const state = () => ({
    apiUrl: process.env.VUE_APP_API_URL,

})

const getters = {
    getField,
}

const actions = {
    updateField,
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}