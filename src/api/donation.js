import {http} from "../http/index.js";

export const createDonation = (data) => {
    return http.post('/donation', data)
}

export const getDonations = () => {
    return http.get('/donation')
}

export const getDonation = (id) => {
    return http.get(`/donation/${id}`)
}

export const acceptRequest = (id, data) => {
    return http.patch(`/donation/${id}`, data)
}

export const editDonation = (id, data) => {
    return http.patch(`/donation/${id}`, data)
}
