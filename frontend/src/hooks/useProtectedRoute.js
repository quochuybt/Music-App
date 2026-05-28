import { useAuth } from "./useAuth";
export const useProtectedRoute = () => useAuth().isAuthenticated;
