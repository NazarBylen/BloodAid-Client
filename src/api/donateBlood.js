import {http} from "../http/index.js";

export const donateBloodToClinic = (data) => {
    return http.post('/donorClinic', data)
}

export const getDonorRequests = () => {
    return http.get(`/donorClinic`)
}

export const patchDonorRequests = (id, data) => {
    return http.patch(`/donorClinic/${id}`, data)
}

export const getBloodDonatesByDonor = (id) => {
    return http.get(`/donorClinic/byDonor/${id}`)
}

export const getBloodDonatesByClinic = (id) => {
    return http.get(`/donorClinic/byClinic/${id}`)
}
