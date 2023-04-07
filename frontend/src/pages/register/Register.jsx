import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import useVerifyAuth from "../../hooks/useVerifyAuth";
import { Label, TextInput } from "flowbite-react";
import { VscEye } from "react-icons/vsc";


const Register = () => {
  return (
    <div className="h-screen bg-dark-bluee flex justify-around items-center">
      <div className='borderr p-3 px-6 flex flex-col gap-4 flex-start bg-gray-50 drop-shadow-md' style={{width: "30%", maxWidth: "60%"}}>
      <div>
          <Label className="main-label" htmlFor="username" value="Username"/>
          <TextInput
            id="username"
            type="text"
            placeholder="Enter username"
            required={true}
          />
        </div>
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
          <Label className="main-label" htmlFor="password" value="Password"/>
          <TextInput
              id="password"
              type="password"
            //   rightIcon={VscEye}
              placeholder="Enter password"
              required={true}
          />
        </div>
        <button onClick={()=>login()} className='block font-bold text-white bg-blue-500 border border-blue-500 p-2 rounded-md duration-150 hover:text-blue-500 hover:bg-white'>Register</button>
        <p className="text-center text-sm">Existing user? <Link to="/sign-in" className='underline text-blue-500'>Proceed to log in</Link></p>
        {/* <Link to="/" className='underline text-white'>Back to homepage</Link> */}
      </div>
    </div>
  )
}

export default Register