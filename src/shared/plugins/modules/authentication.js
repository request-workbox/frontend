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
            passwordsMatch: false,
        },
        reset: {
            username: '',
        },
        change: {
            username: '',
            password1: '',
            password2: '',
            code: '',
            passwordsMatch: false,
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
        validateSignup(state) {
            state.signup.passwordsMatch = false

            if (state.signup.password1 === state.signup.password2) {
                if (state.signup.password1 !== '') {
                    if (state.signup.username !== '') {
                        if (state.signup.email !== '') {
                            return state.signup.passwordsMatch = true
                        }
                    }
                }
            }
        },
        validateChange(state) {
            state.change.passwordsMatch = false

            if (state.change.password1 === state.change.password2) {
                if (state.change.password1 !== '') {
                    if (state.change.username !== '') {
                        if (state.change.code !== '') {
                            return state.change.passwordsMatch = true
                        }
                    }
                }
            }
        },
        clearFields(state) {
            state.login.username = ''
            state.login.password1 = ''

            state.signup.username = ''
            state.signup.email = ''
            state.signup.password1 = ''
            state.signup.password2 = ''
            state.signup.passwordsMatch = false

            state.reset.username = ''

            state.change.username = ''
            state.change.password1 = ''
            state.change.password2 = ''
            state.change.code = ''
            state.change.passwordsMatch = false

            state.confirm.username = ''
            state.confirm.code = ''
        }
    },
    actions: {
        async loginUser({ commit, state, dispatch }, { username, password }) {
            try {
                await dispatch('cognito/signInUser', {
                    username: username, 
                    password: password
                }, { root: true })
                commit('clearFields')
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
                commit('clearFields')
            } catch (err) {
                console.log(err)
            }
        },
        async resetUser({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/forgotPassword', {
                    username: state.reset.username,
                }, { root: true })
                commit('clearFields')
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
                commit('clearFields')
            } catch (err) {
                console.log(err)
            }
        },
        async logoutUser({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/signOut', null, { root: true })
                commit('clearFields')
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
                commit('clearFields')
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