import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../modules/auth/application/stores/user-store";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUserStore();
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
