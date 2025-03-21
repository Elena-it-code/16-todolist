import { setAppStatusAC } from "../../../app/app-reducer"
import { AppDispatch } from "../../../app/store"
import { LoginArgs } from "../api/authApi.types"
import { tasksApi } from "../../todolists/api/tasksApi"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { removeTaskAC } from "../../todolists/model/tasks-reducer"
import { authApi } from "../api/authApi"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))

  authApi
    .login(data)
    .then((res) => {
      dispatch(setAppStatusAC("loading"))
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}


export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))

  authApi
    .logout()
    .then((res) => {
      dispatch(setAppStatusAC("loading"))
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(false)) // меняем с true на false
        localStorage.removeItem("sn-token") // удаляем token
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}