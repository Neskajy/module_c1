import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter, HashRouter, Navigate } from 'react-router-dom'
import './App.css'
import LayoutPage from './Layout_page'
import { createContext } from 'react'

import Home from './pages/home'
import Login from './pages/Login'
import Post_form_page from './pages/post_form_page'
import Edit_post_page from './pages/Edit_post_page'
import Profile_page from './pages/profile_page'
import Register from './pages/register'
import { $fetch } from './fetch'
import Logout from './Logout'
// import { $fetch } from './fetch';

export const UserContext = createContext(null)

export const ProtectedRoute = ({children}) => {
  if (!localStorage.getItem("token")) {
    alert("GET OUT!!")
    return <Navigate to="/profile" replace/>;
  }

  return children
}

export const AntiProtectedRoute = ({children}) => {
  if (localStorage.getItem("token")) {
    alert("GET OUT!!")
    return <Navigate to="/login" replace/>;
  }

  return children
}

export const getUser = async () => {

  try {
    if (!localStorage.getItem("token")) {
      return null;
    }

    const response = await $fetch("api-of/user/5", {
      "method": "GET",
    })
    console.log(response)
    return response
  } catch (err) {
    console.error("ошибка получения пользователя", err)
  }

}

function App() {

  const [user, setUser] = useState(null)

  useEffect(
    () => {
      async function getData() {
        const responseData = await getUser()
        setUser(responseData)
      }
      getData()
    }, [])

  return (
    <HashRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path="/" element={<LayoutPage/>}>
            <Route index element={<Home />}/>
            <Route path="login"
              element={
                <AntiProtectedRoute>
                  <Login />
                </AntiProtectedRoute>
              }
            />
            <Route path="post_form" 
              element={
                <ProtectedRoute>
                  <Post_form_page />
                </ProtectedRoute>
              }
            />
            <Route path="post_edit/:post_id" 
              element={
                <ProtectedRoute>
                  <Edit_post_page />
                </ProtectedRoute>
              }
            />
            <Route path="profile"
              element={
                <ProtectedRoute>
                  {<Profile_page />}
                </ProtectedRoute>
              }
            />
            <Route path="register"
              element={
                <AntiProtectedRoute>
                  <Register />
                </AntiProtectedRoute>
              }
            />
            <Route path="logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  )
}

export default App
