
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredToken, isAdmin } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import MangaUploadForm from "@/components/admin/MangaUploadForm";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = getStoredToken();
    if (!isAdmin(token)) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You must be logged in as admin to view this page",
      });
      navigate("/admin-login");
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <MangaUploadForm />
      </main>
    </div>
  );
};

export default AdminDashboardPage;
