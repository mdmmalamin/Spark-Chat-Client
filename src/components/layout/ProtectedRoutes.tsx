import { ReactNode } from "react";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Navigate } from "react-router";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoutes = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(selectCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
    // console.log(user);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
