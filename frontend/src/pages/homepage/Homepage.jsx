
import { Link } from "react-router-dom";
import useVerifyAuth from "../../hooks/useVerifyAuth";

const Homepage = () => {
  useVerifyAuth()
  return (
    <div className="h-screen bg-dark-blue flex flex-col justify-around items-center">
      <div className="text-center">
        <h1 className="mb-10 block text-3xl font-bold text-yellow-400">
          Welcome
        </h1>
        <Link to="/sign-in" className="underline text-white">
          {" "}
          Proceed to Sign In
        </Link>
      </div>
    </div>
  );
};
export default Homepage;
