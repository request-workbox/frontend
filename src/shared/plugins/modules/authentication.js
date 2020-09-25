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
        async loginUser({ commit, state, dispatch }) {
            try {
                console.log(state.login)
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
                const newUser = await dispatch('cognito/registerUser', {
                    username: state.signup.username,
                    password: state.signup.password1,
                    attributes: {
                        email: state.signup.email
                    }
                }, { root: true })
            } catch (err) {
                return err
            }
        },
        async resetPassword({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/forgotPassword', {
                    username: state.change.username,
                }, { root: true })
            } catch (err) {
                return err
            }
        },
        async changePassword({ commit, state, dispatch }) {
            try {
                await dispatch('cognito/changePassword', {
                    username: state.change.username,
                    code: state.change.code,
                    newPassword: state.change.password1,
                }, { root: true })
            } catch (err) {
                return err
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
                await dispatch('cognito/confirmUser', {
                    username: state.confirm.username,
                    code: state.confirm.code
                }, { root: true })
            } catch (err) {
                return err
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