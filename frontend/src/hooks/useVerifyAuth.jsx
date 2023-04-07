import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/authContext";

const useVerifyAuth = () => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
        navigate("/workspace/dashboard")
    }
  },[])
  

};

export default useVerifyAuth;
