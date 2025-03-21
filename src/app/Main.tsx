import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import React, { useEffect } from "react"
import { AddItemForm } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useNavigate } from "react-router"
import { selectIsLoggedIn } from "../features/auth/model/authSelectors"
import { Path } from "common/routing"

export const Main = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  // Редирект (навигацию) реализовали при помощи хука useNavigate из React Router
  useEffect(() => {
    if (!isLoggedIn) { // если я не залогинен,
      navigate(Path.Login) // то перебрось меня на страницу Login
    }
  }, [isLoggedIn, navigate])

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
