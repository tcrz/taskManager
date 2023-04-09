import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import useVerifyAuth from "../../hooks/useVerifyAuth";
import { Label, TextInput } from "flowbite-react";
import { VscEye, VscEyeClosed} from "react-icons/vsc";
import useApiRequests from "../../hooks/useApiRequests";
import AlertLogger from "../../components/AlertLogger";
import LoadingButton from "../../components/LoadingButton";

 const SignIn = () => {
  const [showPassword, setShowPassword] = useState(true)
    // useVerifyAuth()
    const { setAuthenticated, setUser, setToken } = useContext(AuthContext);
    const { httpPostAsync } = useApiRequests()
    const [email, setEmail] = useState("crzctrl5789@gmail.com")
    const [password, setPassword] = useState("crzctrl5789")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
      setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
      e.preventDefault()
      console.log("..logging in")
      try {
        setError(null)
        setLoading(true)
        const body = {email, password}
        const response = await httpPostAsync("/users/login", body)
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        localStorage.setItem("authenticated", true)
        setAuthenticated(true)
        setUser(response.user)
        setToken(response.token)
        navigate("/workspace/dashboard")
        console.log(response)
      } catch (err) {
        console.log(err)
        if (err.response) {
          setError({type: "failure", message: err.response.data.message})
        }
        // console.log(err.response.data.message)
      }
      setLoading(false)
      // setAuthenticated(true)
      // localStorage.setItem("authenticated", true)
      
    }
    
    return (
    <form onSubmit={handleLogin} autocomplete={false}>
      <div className="h-screen bg-dark-bluee flex justify-around items-center">
        <div className='borderr p-3 px-6 flex flex-col gap-4 flex-start bg-gray-100 drop-shadow-md' style={{width: "30%", maxWidth: "60%"}}>
          {error && <AlertLogger type={error.type} message={error.message} />}
          <div>
            <Label className="main-label" htmlFor="email" value="Email"/>
            <TextInput
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required={true}
            />
          </div>
          <div>
            <Label className="main-label" htmlFor="password" value={"Password"}/>
            <TextInput
                id="password"
                type="password"
                value={password}
                // rightIcon={showPassword ? VscEye : VscEyeClosed}
                // onClick={()=>setShowPassword(prev => !prev)}
                placeholder="Enter password"
                onChange={handlePasswordChange}
                required={true}
            />
          </div>
          <LoadingButton type="submit" loading={loading} text="Sign in" className='block font-bold text-white bg-blue-500 border border-blue-500 p-2 rounded-md hover:bg-blue-600 duration-150' />
          <p className="text-center text-sm">New user? <Link to="/register" className='underline text-blue-500'>Register here</Link></p>
          {/* <Link to="/" className='underline text-white'>Back to homepage</Link> */}
        </div>
      </div>
    </form>
    )
  }

  export default SignIn