import LoginComp from "@/components/LoginComp";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <LoginComp />
    </div>
  );
};

export default Login;
