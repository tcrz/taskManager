import { useContext, useEffect, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Link, Navigate, Outlet, Route, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/dashboard/dashboard/Dashboard'
import SignIn from './pages/signIn/SignIn'
import { AuthContext } from './context/authContext'
import Homepage from './pages/homepage/Homepage'
import Register from './pages/register/Register'
import Tasks from './pages/tasks/Tasks'
import { QueryClient, QueryClientProvider } from 'react-query';
import CreateTask from './pages/tasks/CreateTask'
import WorkSpace from './pages/workspace/WorkSpace'


function Root() {
  return  (
    <Outlet/>
  )
}

function Protected({ children }) {
  const { authenticated } = useContext(AuthContext)
  console.log("protected:", authenticated)
  if (!authenticated) {
    return <Navigate to="/sign-in" replace />
  }
  return children
}

function App() {
  const qClient = new QueryClient();
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [token, setToken] = useState(localStorage.getItem('token'))
  console.log(authenticated)

  const deleteUserSessionData = () => {
    localStorage.clear()
  }

  useEffect(() => {
    // console.log(localStorage.getItem("authenticated"))
    localStorage.getItem("authenticated") ? setAuthenticated(true) : setAuthenticated(false)

    if (user) {
      localStorage.setItem("authenticated", true)
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
      deleteUserSessionData()
    }
  }, [user])

  const logOut = () => {
    localStorage.setItem("authenticated", false)
    setAuthenticated(false)
    localStorage.clear()
  }

  const context = {
    user,
    token,
    authenticated,
    setToken,
    setUser,
    setAuthenticated,
    logOut
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {
        !authenticated ?
        <>
          <Route index element={<Homepage/>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </>
        :
        <>
        <Route path="/" element={<WorkSpace />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />}>
            <Route path="new-task" element={<CreateTask />} />
          </Route>
          <Route path="*" element={<Navigate to='dashboard' replace />} />
        </Route>
        <Route index element={<Navigate to='/dashboard' replace />} />
        </>
        }
      </Route>
    )
  )

  return (
    <QueryClientProvider client={qClient}>
      <AuthContext.Provider value={context}>
      <RouterProvider router={router} />
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

export default App
