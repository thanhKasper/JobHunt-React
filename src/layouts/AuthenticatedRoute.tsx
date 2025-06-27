import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthenticatedRoute = () => {
  const authState = useAppSelector((state) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) navigate("/login");
  });

  return <Outlet />;
};

export default AuthenticatedRoute;
