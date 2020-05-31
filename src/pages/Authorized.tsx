/*
 * 权限组件
 * @Author: copy from antd pro
 * @Date: 2020-05-30 06:30:33
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-06-01 06:49:43
 */

import React, { useEffect } from 'react';
import { Redirect, connect, ConnectProps, useDispatch } from 'umi';
import Authorized from '@/utils/Authorized';
import { getRouteAuthority } from '@/utils/utils';
import { ConnectState, UserModelState } from '@/models/connect';
import { stringify } from 'querystring';
import ErrorBoundary from '@/components/ErrorBoundary';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'user/fetchLoginStatus',
    });
  }, [isLogin]);

  const matchComponent = () => {
    if (isLogin) return <Redirect to="/exception/403" />;
    const queryString = stringify({
      redirect: window.location.href,
    });
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
  };

  return (
    <ErrorBoundary>
      <Authorized
        authority={getRouteAuthority(location.pathname, routes) || ''}
        noMatch={matchComponent()}
      >
        {children}
      </Authorized>
    </ErrorBoundary>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
