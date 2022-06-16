import React, {useState, useContext} from 'react';
import './App.css';

import Navbar from './components/ui/Navbar';
import LoginForm from './components/LoginForm';
import Dashboard from './components/projects/Dashboard';

import AuthContext from './components/store/auth-context';
import Greeting from './components/projects/Greeting';



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
    <div className="App">
      <Navbar loginClick={login_yes} />
      {!wantsToLogin && !ctx.isLoggedIn && <Greeting />}
      {wantsToLogin && !ctx.isLoggedIn && <LoginForm cancelClick={login_no}/>}
      {ctx.isLoggedIn && <Dashboard/>}
    </div>
  );
}

export default App;
