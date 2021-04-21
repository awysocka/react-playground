import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, login, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (login) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  prevLocation: path,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
