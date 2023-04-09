
import { Link } from "react-router-dom";
import useVerifyAuth from "../../hooks/useVerifyAuth";
import { Button } from "flowbite-react";

const Homepage = () => {
  useVerifyAuth()
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-around items-center">
      <div className="flex flex-col items-center text-center borrder">
        <h1 className="mb-10 block text-5xl font-bold text-blue-500">
          taskManager
        </h1>
        
          <Link to="/sign-in" className="border text-white">
            <Button className="text-blue-500">
              {" "}
              Proceed to Sign In
            </Button>
          </Link>
      </div>
    </div>
  );
};
export default Homepage;
