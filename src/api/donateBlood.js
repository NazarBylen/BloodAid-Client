import {http} from "../http/index.js";

export const donateBloodToClinic = (data) => {
    return http.post('/donorClinic', data)
}

export const getBloodDonatesByDonor = (id) => {
    return http.get(`/donorClinic/byDonor/${id}`)
}
