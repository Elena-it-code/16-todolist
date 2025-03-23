export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
export type MeResponse = {
  id: number
  email: string
  login: string
}