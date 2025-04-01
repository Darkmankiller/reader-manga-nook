
// Simulated JWT Authentication
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const JWT_SECRET = "manga-publishing-secret-key";

interface User {
  username: string;
  role: "admin" | "user";
}

export function loginUser(username: string, password: string): string | null {
  // Simple validation - in a real app, this would verify against a database
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create a simple token - in a real app, use a proper JWT library
    const user: User = { username, role: "admin" };
    const token = btoa(JSON.stringify({
      user,
      exp: Date.now() + 3600000 // 1 hour expiration
    }));
    
    return token;
  }
  return null;
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = JSON.parse(atob(token));
    
    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return null;
    }
    
    return decoded.user;
  } catch (error) {
    return null;
  }
}

export function isAdmin(token: string | null): boolean {
  if (!token) return false;
  
  const user = verifyToken(token);
  return user?.role === "admin";
}

// Helper to get token from localStorage
export function getStoredToken(): string | null {
  return localStorage.getItem("manga-auth-token");
}

// Store token in localStorage
export function storeToken(token: string): void {
  localStorage.setItem("manga-auth-token", token);
}

// Remove token from localStorage
export function removeToken(): void {
  localStorage.removeItem("manga-auth-token");
}
