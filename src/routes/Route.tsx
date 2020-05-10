import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // somente o nome do componente
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  const isSigned = !!user;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // true/true OK
        // true/false redireciona login
        // false/true redireciona dashboard
        // false/false ok
        return isPrivate === isSigned ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }, // mantêm histórico
            }}
          />
        );
      }}
    />
  );
};

export default Route;
