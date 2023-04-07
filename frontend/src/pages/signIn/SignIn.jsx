import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import useVerifyAuth from "../../hooks/useVerifyAuth";
import { Label, TextInput } from "flowbite-react";
import { VscEye, VscEyeClosed} from "react-icons/vsc";

 const SignIn = () => {
  const [showPassword, setShowPassword] = useState(true)
    // useVerifyAuth()
    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate()

    const login = () => {
      setAuthenticated(true)
      localStorage.setItem("authenticated", true)
      navigate("/workspace/dashboard")
    }
    
    return (
    <div className="h-screen bg-dark-bluee flex justify-around items-center">
      <div className='borderr p-3 px-6 flex flex-col gap-4 flex-start bg-gray-100 drop-shadow-md' style={{width: "30%", maxWidth: "60%"}}>
        <div>
          <Label className="main-label" htmlFor="email" value="Email"/>
          <TextInput
            id="email"
            type="email"
            placeholder="Enter email"
            required={true}
          />
        </div>
        <div>
          <Label className="main-label" htmlFor="password" value={"Password"}/>
          <TextInput
              id="password"
              type="password"
              // rightIcon={showPassword ? VscEye : VscEyeClosed}
              // onClick={()=>setShowPassword(prev => !prev)}
              placeholder="Enter password"
              required={true}
          />
        </div>
        <button onClick={()=>login()} className='block font-bold text-white bg-blue-500 border border-blue-500 p-2 rounded-md duration-150 hover:text-blue-500 hover:bg-white'>Sign in</button>
        <p className="text-center text-sm">New user? <Link to="/register" className='underline text-blue-500'>Register here</Link></p>
        {/* <Link to="/" className='underline text-white'>Back to homepage</Link> */}
      </div>
    </div>
    )
  }

  export default SignIn