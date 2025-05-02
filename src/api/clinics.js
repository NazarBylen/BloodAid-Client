import {http} from "../http";

export const GetAllClinics = () => {
    return http.get('/clinic')
}