
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    removeToken();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default AdminHeader;
