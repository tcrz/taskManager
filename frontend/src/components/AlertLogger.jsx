import React from "react";
import { VscCheck, VscInfo } from "react-icons/vsc";
import { Alert } from "flowbite-react";


const AlertLogger = ({type, message }) => {
return (
  <Alert
    color={type}
    icon={type ? type === "success" && VscCheck : type === "error" && VscInfo}
  >
    <span>
      <span className="font-medium">
        {message}
      </span>
    </span>
  </Alert>
)
};

export default AlertLogger;