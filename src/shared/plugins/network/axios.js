import Axios from 'axios'

const AxiosInstance = {
    install(Vue, store) {

        function clearAuthorizationHeader(config) {
            delete config.headers['Authorization']
            return config
        }

        const axios = Axios.create({
            baseURL: process.env.VUE_APP_API_URL,
        })

        axios.interceptors.request.use(async function(config) {
            try {
                
                if (config.baseURL !== process.env.VUE_APP_API_URL) {
                    return clearAuthorizationHeader(config)
                }
                
                const token = await store.dispatch('cognito/fetchJwtToken', null, {root: true})
                config.headers['Authorization'] = `Bearer ${token}`

                return config
            } catch (err) {
                return clearAuthorizationHeader(config)
            }
        });

        // Mount axios instance
        Vue.$axios = axios
        Vue.$Axios = Axios

    }
};

export default AxiosInstance;