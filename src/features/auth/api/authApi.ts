import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { LoginArgs, MeResponse } from "./authApi.types"

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number, token: string }>>(`/auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseResponse>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponse<MeResponse>>(`/auth/me`)
  }
}