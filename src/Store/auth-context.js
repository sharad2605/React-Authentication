import React, { useState, useEffect } from "react";  

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    
    const storedToken = localStorage.getItem('token');
    const storedExpiry = localStorage.getItem('expiresAt');
    const currentTime = Date.now();

    const isTokenValid = storedToken && storedExpiry && currentTime < storedExpiry;
    const [token, setToken] = useState(isTokenValid ? storedToken : null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => { 
        const expiresAt = Date.now() + 5 * 60 * 1000; // Token expires in 5 minutes
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expiresAt', expiresAt);

        // Auto logout after 5 minutes
        setTimeout(logoutHandler, expiresAt - Date.now());
    };  

    const logoutHandler = () => {    
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        alert("Session expired. Please log in again.");
    };  

    // Auto logout if the token is expired when the page loads
    useEffect(() => {
        if (!isTokenValid) {
            logoutHandler();
        } else {
            const remainingTime = storedExpiry - Date.now();
            setTimeout(logoutHandler, remainingTime);
        }
    }, []);

    const contextValue = {  
        token: token,
        isLoggedIn: userIsLoggedIn,  
        login: loginHandler,
        logout: logoutHandler    
    };

    return <AuthContext.Provider value={contextValue}>  
        {props.children}
    </AuthContext.Provider>;     
};

export default AuthContext;
