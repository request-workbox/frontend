import { getField, updateField } from 'vuex-map-fields'

export default {
    namespaced: true,
    state: {
        login: {
            username: '',
            password1: '',
        },
        signup: {
            username: '',
            email: '',
            password1: '',
            password2: '',
        },
        change: {
            username: '',
            password1: '',
            password2: '',
            code: '',
        },
        confirm: {
            username: '',
            code: ''
        }
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
    },
    actions: {
        async loginUser({ commit, state, dispatch }, { username, password }) {
            try {
                await dispatch('cognito/signInUser', {
                    username: username, 
                    password: password
                }, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
        async signupUser({ commit, state, dispatch, rootState },{ username, password }) {
            try {
                const newUser = await dispatch('cognito/registerUser', {
                    username: username,
                    password: password,
                    attributes: {
                        email: 'newuser@email.com'
                    }
                }, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
        async resetPassword({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/forgotPassword', {
                    username: state.change.username,
                }, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
        async changePassword({ commit, state, dispatch }) {
            try {
                // action to get available connections
                await dispatch('cognito/changePassword', {
                    username: state.change.username,
                    code: state.change.code,
                    newPassword: state.change.password1,
                }, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
        async logoutUser({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/signOut', null, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
        async confirmUser({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/confirmUser', {
                    username: state.confirm.username,
                    code: state.confirm.code
                }, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
        async fetchSession({ commit, state, dispatch }) {
            try {
                const session = await dispatch('cognito/fetchSession', null, { root: true })
            } catch (err) {
                console.log(err)
            }
        },
    },
}