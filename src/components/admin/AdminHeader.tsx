
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { HomeIcon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <HomeIcon className="h-4 w-4 mr-1" />
            View Site
          </Link>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
