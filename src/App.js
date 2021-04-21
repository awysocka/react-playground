import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AddTask from './components/organisms/AddTask';
import TasksList from './components/organisms/TasksList';
import LoginForm from './components/organisms/LoginForm';
import EditTask from './components/organisms/EditTask';
import ContactForm from './components/organisms/ContactForm';
import ProtectedRoute from './components/ProtectedRout';
import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import NavBar from './components/organisms/NavBar';
import { getToken } from './auth';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#f06292',
    },
  },
});

function App() {
  const isTokenStored = Boolean(getToken());
  const [isLogged, setIsLogged] = useState(isTokenStored);

  // if(!isLogged) {
  //   return <LoginForm setIsLogged={setIsLogged} />
  // }

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='App'>
          {isLogged && <NavBar handleLogout={handleLogout} />}
          <Switch>
            <Route path='/' exact>
              {isLogged ? <Redirect to='/list' /> : <LoginForm handleLogin={handleLogin} />}
            </Route>
            <ProtectedRoute path='/add' login={isLogged} component={AddTask} />
            <ProtectedRoute path='/contact-form' login={isLogged} component={ContactForm} />
            <ProtectedRoute path='/list' exact login={isLogged} component={TasksList} />
            <ProtectedRoute path='/list/:taskId' login={isLogged} component={EditTask} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
