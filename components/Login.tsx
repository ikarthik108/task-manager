import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC<{}> = () => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-10">
          Login to Task Manager
        </h1>
        <div className="mt-2 flex justify-center">
          <button
            className=" flex gap-1 w-1/2 text-center justify-center items-center px-4 py-2  text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={loginWithGoogle}
          >
            <FcGoogle size={18} />
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
