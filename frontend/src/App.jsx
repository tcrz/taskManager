import { useEffect, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Link, Navigate, Outlet, Route, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import WorkSpace from './pages/dashboard/WorkSpace'
import Dashboard from './pages/dashboard/dashboard/Dashboard'
import SignIn from './pages/signIn/SignIn'
import { AuthContext } from './context/authContext'
import Homepage from './pages/homepage/Homepage'
import Register from './pages/register/Register'
import Tasks from './pages/meetings/Tasks'
import NewTask from './pages/meetings/NewTask'



function Root() {
  return  (
    <Outlet/>
  )
}

function Protected({ authenticated, children }) {
  console.log(authenticated)
  if (!authenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")))
  console.log(typeof(authenticated))
  useEffect(() => {
    // console.log(localStorage.getItem("authenticated"))
    // localStorage.getItem("authenticated") ? setAuthenticated(true) : setAuthenticated(false)

    if (authenticated) {
      console.log("auth", authenticated)
      localStorage.setItem("authenticated", true)
    } else {
      localStorage.setItem("authenticated", false)
    }
  }, [authenticated])

  const logOut = () => {
    localStorage.setItem("authenticated", false)
    setAuthenticated(false)
  }

  const context = {
    authenticated,
    setAuthenticated,
    logOut
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        
        {/* AUTH ROUTES */}
        <Route path="/workspace" element={ <Protected authenticated={authenticated}><WorkSpace /></Protected>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />}>
            <Route path="new-task" element={<NewTask />} />
          </Route>
          <Route path="*" element={<Navigate to='dashboard' replace />} />
        </Route>
      </Route>
    )
  )

  return (
    <AuthContext.Provider value={context}>
     <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
