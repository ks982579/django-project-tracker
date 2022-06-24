import React, {useState, useContext} from 'react';
import './App.css';

import Navbar from './components/ui/Navbar';
import LoginForm from './components/LoginForm';
import Dashboard from './components/projects/Dashboard';

import AuthContext from './components/store/auth-context';
import Greeting from './components/projects/Greeting';
import { DevContextProvider } from './components/store/dev-context';



function App() {
  const ctx = useContext(AuthContext);
  const [wantsToLogin, setWantsToLogin] = useState(false);

  const login_yes = () => {
    setWantsToLogin(true);
  }
  const login_no = () => {
    setWantsToLogin(false);
  }

  return (
    <DevContextProvider>
      <Navbar loginClick={login_yes} />
      {!wantsToLogin && !ctx.isLoggedIn && <Greeting />}
      {wantsToLogin && !ctx.isLoggedIn && <LoginForm cancelClick={login_no}/>}
      {ctx.isLoggedIn && <Dashboard/>}
    </DevContextProvider>
  );
}

export default App;
