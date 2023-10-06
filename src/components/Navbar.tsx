import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const { onRemove, user } = useAuth();
  const handleLogout = async () => {
    const res = await axios.post(
      "https://test.employee.tokoweb.xyz/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    console.log(res);

    if ("data" in res && res.data.status) {
      onRemove();
    }
  };

  return (
    <div className="max-w-7xl h-full mx-auto flex justify-between items-center px-4">
      <h1 className="font-bold text-xl">Auth & Crud with React</h1>
      <Button onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Navbar;
