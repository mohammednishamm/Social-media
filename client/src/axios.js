import axios from "axios"

export const makeRequest=axios.create({
    baseURL:"http://localhost:8400/api/",
    withCredentials:true
})