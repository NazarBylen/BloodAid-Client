import { http } from "../http";

export const SignUp = (data) => {
  return http.post('/auth-clinic/sign-up', data)
}

export const LogIn = (data) => {
  return http.post('/auth-clinic/login', data)
}

export const GetClinicInfo = (id) => {
  return http.get(`/clinic/${id}`)
}

export const ChangeClinicPassword = (id, data) => {
  return http.patch(`/auth-clinic/change-password/${id}`, data)
}

export const DeleteClinic = (id) => {
  return http.delete(`/auth-clinic/delete-clinic/${id}`)
}