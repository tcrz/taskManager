import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import useVerifyAuth from "../../hooks/useVerifyAuth";
import { Label, TextInput } from "flowbite-react";
import { VscEye } from "react-icons/vsc";
import LoadingButton from "../../components/LoadingButton";
import useApiRequests from "../../hooks/useApiRequests";
import AlertLogger from "../../components/AlertLogger";


const Register = () => {
  const { httpPostAsync } = useApiRequests()
  const [username, setUsername] = useState("crzctrl")
  const [email, setEmail] = useState("crzctrl5789@gmail.com")
  const [password, setPassword] = useState("crzctrl5789")
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const resetFields = () => {
    setUsername("")
    setEmail("")
    setPassword("")
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRegisterUser = async (e) => {
    e.preventDefault()
    console.log("..logging in")
    try {
      setAlert(null)
      setLoading(true)
      const body = {username, email, password}
      const response = await httpPostAsync("/users/register", body)
      setAlert({type: "success", message: response.message})
      resetFields()
      console.log(response)
    } catch (err) {
      console.log(err)
      if (err.response) {
        setAlert({type: "failure", message: err.response.data.message})
      }
      
    }
    setLoading(false)
  }
  
  return (
    <form onSubmit={handleRegisterUser} autocomplete={false}>
      <div className="h-screen bg-dark-bluee flex justify-around items-center">
        <div className='borderr p-3 px-6 flex flex-col gap-4 flex-start bg-gray-100 drop-shadow-md' style={{width: "30%", maxWidth: "60%"}}>
        {alert && <AlertLogger type={alert.type} message={alert.message}/>}
        <div>
            <Label className="main-label" htmlFor="username" value="Username"/>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter username"
              required={true}
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div>
            <Label className="main-label" htmlFor="email" value="Email"/>
            <TextInput
              id="email"
              type="email"
              placeholder="Enter email"
              required={true}
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <Label className="main-label" htmlFor="password" value="Password"/>
              <VscEye className="text-md cursor-pointer"/>
            </div>
            
            <TextInput
              id="password"
              type="password"
            //   rightIcon={VscEye}
              placeholder="Enter password"
              required={true}
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <LoadingButton onClick={()=>login()} text="Register" loading={loading} className='block font-bold text-white bg-blue-500 border border-blue-500 p-2 rounded-md hover:bg-blue-600 duration-150 '/>
          <p className="text-center text-sm">Existing user? <Link to="/sign-in" className='underline text-blue-500'>Proceed to log in</Link></p>
          {/* <Link to="/" className='underline text-white'>Back to homepage</Link> */}
        </div>
      </div>
    </form>
  )
}

export default Register