import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'

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
        async loginUser({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/signInUser', {
                    username: state.login.username, 
                    password: state.login.password1
                }, { root: true })
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err) 
            }
        },
        async signupUser({ commit, state, dispatch, rootState }) {
            try {
                if (state.signup.password1 === '') {
                    throw new Error('Please confirm password')
                }
                if (state.signup.password1 !== state.signup.password2) {
                    throw new Error('Passwords must match')
                }

                if (state.signup.email === '') {
                    throw new Error('Please include an email')
                }

                const newUser = await dispatch('cognito/registerUser', {
                    username: state.signup.username,
                    password: state.signup.password1,
                    attributes: {
                        email: state.signup.email
                    }
                }, { root: true })
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err) 
            }
        },
        async resetPassword({ commit, state, dispatch }) {
            try {
                if (state.change.username === '') {
                    throw new Error('Please confirm username')
                }

                await dispatch('cognito/forgotPassword', {
                    username: state.change.username,
                }, { root: true })
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err)
            }
        },
        async changePassword({ commit, state, dispatch }) {
            try {
                if (state.change.username === '') {
                    throw new Error('Please confirm username')
                }
                if (state.change.password1 === '') {
                    throw new Error('Please confirm password')
                }
                if (state.change.password1 !== state.change.password2) {
                    throw new Error('Passwords must match')
                }

                await dispatch('cognito/changePassword', {
                    username: state.change.username,
                    code: state.change.code,
                    newPassword: state.change.password1,
                }, { root: true })
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err)
            }
        },
        async logoutUser({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/signOut', null, { root: true })
            } catch (err) {
                throw new Error(err)
            }
        },
        async confirmUser({ commit, state, dispatch }) {
            try {
                if (state.confirm.username === '') {
                    throw new Error('Please confirm username')
                }
                if (state.confirm.code === '') {
                    throw new Error('Please confirm sign up code')
                }

                await dispatch('cognito/confirmUser', {
                    username: state.confirm.username,
                    code: state.confirm.code
                }, { root: true })
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err)
            }
        },
        async fetchSession({ commit, state, dispatch }) {
            try {
                const session = await dispatch('cognito/fetchSession', null, { root: true })
            } catch (err) {
                return err
            }
        },
    },
}