import React, {createContext, useState} from 'react';


const AuthContext = createContext({});


export const AuthProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [tokenExpiration, setTokenExpiration] = useState("");
    const [userId, setUserId] = useState("");
    const [clientWithHeader, setClientWithHeader] = useState("");
    
    console.log(clientWithHeader);
    const loginProcess = (token, id, tokenExpiration) => {
        setToken(token);
        setUserId(id);
        setTokenExpiration(tokenExpiration)
    }

    /**
     * clean out the token and login details
     */
    const logout = () => {
        setToken("");
        setUserId("");
        setTokenExpiration("");
    }

    return (
        <AuthContext.Provider
            value = {{token, setToken, userId, setUserId, loginProcess, logout, clientWithHeader, setClientWithHeader }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext