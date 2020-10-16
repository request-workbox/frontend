import SocketIO from 'socket.io-client'

const AxiosInstance = {
    install(Vue) {

        const apiSocket = SocketIO(process.env.VUE_APP_API_URL)
        const jobsSocket = SocketIO(process.env.VUE_APP_JOBS_URL)

        // apiSocket event listeners
        apiSocket.on('connect', () => {
            // console.log('api socket connected')
        })
        apiSocket.on('error', (err) => {
            // console.log('api socket error', err)
        })

        // jobsSocket event listeners
        jobsSocket.on('connect', () => {
            // console.log('jobs socket connected')
        })
        jobsSocket.on('error', (err) => {
            // console.log('jobs socket error', err)
        })

        Vue.$apiSocket = apiSocket
        Vue.$jobsSocket = jobsSocket
    }
};

export default AxiosInstance;