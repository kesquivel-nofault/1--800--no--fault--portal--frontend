import { Navigate } from "react-router-dom";
import { useUserStore } from "../modules/auth/application/stores/user-store";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
