import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://api.garudanihon.my.id'
})

export default axiosInstance