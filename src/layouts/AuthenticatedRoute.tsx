import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getGeneralJobFilterPage } from "@/store/slices/jobFilterSlice";
import { getProjects } from "@/store/slices/projectSlice";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthenticatedRoute = () => {
  const authState = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authState.isAuthenticated) navigate("/login");
    else {
      dispatch(getGeneralJobFilterPage());
      dispatch(getProjects());
    }
  });

  return <Outlet />;
};

export default AuthenticatedRoute;
