import { getField, updateField } from 'vuex-map-fields'
import _ from 'lodash'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        billingUrl: process.env.VUE_APP_BILLING_URL,
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
        updateResetUsername(state, username) {
            state.change.username = username
        },
        updateConfirmUsername(state, username) {
            state.confirm.username = username
        },
        updateLoginUsername(state, username) {
            state.login.username = username
        },
    },
    actions: {
        async createCustomer({ commit, state, dispatch }) {
            try {
                const requestUrl = `${state.billingUrl}/create-customer`
                const requestBody = { username: state.signup.username, email: state.signup.email }
                const request = await Vue.$axios.post(requestUrl, requestBody)
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err) 
            }
        },
        async updateCustomer({ commit, state, dispatch }) {
            try {
                const requestUrl = `${state.billingUrl}/update-customer`
                const requestBody = { username: state.confirm.username }
                const request = await Vue.$axios.post(requestUrl, requestBody)
            } catch (err) {
                if (err.message) throw new Error(err.message)
                else throw new Error(err) 
            }
        },
        async loginUser({ commit, state, dispatch }) {
            try {
                if (state.login.username === '') {
                    throw new Error('Username cannot be empty')
                }
                if (state.login.password1 === '') {
                    throw new Error('Password cannot be empty')
                }
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
                if (state.signup.email === '') {
                    throw new Error('Email cannot be empty')
                }

                if (state.signup.username === '') {
                    throw new Error('Username cannot be empty')
                }

                if (_.size(state.signup.password1) < 8) {
                    throw new Error('Password must contain at least 8 characters')
                }

                if (state.signup.password1 === '') {
                    throw new Error('Password cannot be empty')
                }
                if (state.signup.password1 !== state.signup.password2) {
                    throw new Error('Passwords must match')
                }

                if (_.includes(state.signup.username, '@')) {
                    throw new Error('Username cannot be email')
                }

                if (!/^[a-zA-Z0-9_]*$/.test(state.signup.username)) {
                    throw new Error('Only alphanumeric characters allowed')
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
                    throw new Error('Please enter a username')
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
                    throw new Error('Please enter a username')
                }
                if (state.change.code === '') {
                    throw new Error('Please enter a reset code')
                }

                if (_.size(state.change.password1) < 8) {
                    throw new Error('Password must contain at least 8 characters')
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
        async resendConfirmation({ commit, state, dispatch }) {
            try {
                if (state.confirm.username === '') {
                    throw new Error('Please confirm username')
                }

                await dispatch('cognito/resendConfirmation', {
                    username: state.confirm.username,
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