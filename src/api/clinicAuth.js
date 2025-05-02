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
  return http.patch(`/auth/change-password-clinic/${id}`, data)
}

export const DeleteClinic = (id) => {
  return http.delete(`/auth/delete-clinic/${id}`)
}