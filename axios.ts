import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://192.168.11.136:8000/api'
})

Axios.interceptors.request.use((config) => {
  config.headers['ngrok-skip-browser-warning'] = 'any'

  return config
})

export default Axios
