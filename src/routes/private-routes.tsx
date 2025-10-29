import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import useSessionStore from "@/store/session";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { userSession } = useSessionStore();

  // If not logged in, redirect to login
  if (!userSession) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
