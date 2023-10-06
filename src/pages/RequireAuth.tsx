import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <header className="w-(calc(100vw-17px)) h-20 shadow-sm z-10 border-b">
        <Navbar />
      </header>
      <main className="max-w-6xl mx-auto py-8 px-2">
        <Outlet />
      </main>
    </>
  );
};

export default RequireAuth;
