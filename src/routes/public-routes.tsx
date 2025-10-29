import { Navigate } from "react-router-dom";
import useSessionStore from "@/store/session";
import { type JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PublicRoute = ({ children }: Props) => {
  const { userSession } = useSessionStore();

  // If already logged in, redirect to dashboard
  if (userSession) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
