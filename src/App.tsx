
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ReaderPage from "./pages/ReaderPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MangasPage from "./pages/MangasPage";
import NotFound from "./pages/NotFound";
import { getStoredToken, isAdmin } from "@/lib/auth";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = getStoredToken();
  
  if (!isAdmin(token)) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mangas" element={<MangasPage />} />
          <Route path="/reader/:id" element={<ReaderPage />} />
          <Route path="/login" element={<Navigate to="/admin-login" replace />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={<Navigate to="/admin-dashboard" replace />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <RequireAuth>
                <AdminDashboardPage />
              </RequireAuth>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
