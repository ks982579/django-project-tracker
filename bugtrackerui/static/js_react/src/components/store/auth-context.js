import React, {useState, useEffect, useReducer} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    setLogin: null,
    loginToken: '',
    setToken: null,
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setLoginState] = useState(false);
    const [loginToken, setLoginToken] = useState('');

    //Check if user is already logged in
    useEffect(()=>{
        /* We could check for just a cookie... but we'll ask the server */
        const loginStatus = fetch(`${window.location.href}api/current-user/`)
            .then(response => {
                return response.json();
            }).then(data => {
                if(data['username'] != undefined) {
                    setLoginState(true);
                    let firstName = data["first_name"];
                    let lastName = data["last_name"];
                }
            })
    },[])
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            setLogin: setLoginState,
            loginToken: loginToken,
            setToken: setLoginToken,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;