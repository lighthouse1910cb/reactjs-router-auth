import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { AuthContext } from './context/auth';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const getTokens = () => {
    const token = localStorage.getItem('jwt');
    setAuthTokens(token);
  };

  const setTokens = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data));
    setAuthTokens(data);
  };

  const logout = () => {
    localStorage.setItem('jwt', null);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to='/'>Home Page</Link>
            </li>
            <li>
              <Link to='/admin'>Admin Page</Link>
            </li>
            {authTokens ? <button onClick={logout}>Log out</button> : null}
          </ul>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute path='/admin' component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
