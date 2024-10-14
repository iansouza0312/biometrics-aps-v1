import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../data/store";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: Array<"2" | "3">; // Only allow specific roles
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    // Se nao estiver autenticado volta p/ login
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role as "2" | "3")) {
    // Caso esteja com o acesso restrito
    return <Navigate to="/" />;
  }

  return children;
};
