import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'src/services/store';
import { Preloader } from '../ui/preloader';
import { getUserStatus, UserStatus } from 'src/services/slices/userSlice';

type PrivateRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: PrivateRouteProps) => {
  const location = useLocation();
  const userStatus = useSelector(getUserStatus);

  if (userStatus === UserStatus.CHECKING) {
    return <Preloader />;
  }

  if (!onlyUnAuth && userStatus === UserStatus.NOT_AUTHORIZED) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && userStatus === UserStatus.LOGGED_IN) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.state || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }
  return children;
};
