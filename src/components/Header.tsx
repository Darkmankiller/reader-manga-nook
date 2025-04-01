
import { Link } from "react-router-dom";
import { getStoredToken, isAdmin, removeToken } from "@/lib/auth";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = getStoredToken();
    setIsLoggedIn(isAdmin(token));
  }, []);
  
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };
  
  return (
    <header className="py-4 border-b border-border">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          <span className="text-accent">Manga</span>Nook
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/mangas" className="hover:text-primary transition-colors">
            Mangas
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/admin" className="hover:text-primary transition-colors">
                Admin Panel
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
