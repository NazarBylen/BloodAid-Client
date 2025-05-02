import { http } from "../http";

export const SignUp = (data) => {
  return http.post('/auth/sign-up', data)
}

export const LogIn = (data) => {
  return http.post('/auth/login', data)
}

export const GetPatientInfo = (id) => {
  return http.get(`/patient/${id}`)
}

export const ChangePatientPassword = (id, data) => {
  return http.patch(`/auth/change-password/${id}`, data)
}

export const EditPatientProfile = (id, data) => {
  return http.patch(`/auth/edit-profile/${id}`, data)
}

export const DeletePatient = (id) => {
  return http.delete(`/auth/delete/${id}`)
}