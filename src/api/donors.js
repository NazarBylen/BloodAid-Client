import { http } from "../http";

export const SignUp = (data) => {
  return http.post('/auth-donor/sign-up', data)
}

export const LogIn = (data) => {
  return http.post('/auth-donor/login', data)
}

export const GetDonorInfo = (id) => {
  return http.get(`/donor/${id}`)
}

export const ChangeDonorPassword = (id, data) => {
  return http.patch(`/auth-donor/change-password/${id}`, data)
}

export const EditDonorsProfile = (id, data) => {
  return http.patch(`/auth-donor/edit-profile/${id}`, data)
}

export const DeleteDonor = (id) => {
  return http.delete(`/auth-donor/delete/${id}`)
}