import React, {createContext, useState} from 'react';


const AuthContext = createContext({});


export const AuthProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [tokenExpiration, setTokenExpiration] = useState("");
    const [userId, setUserId] = useState("");
    const login = (token, id, tokenExpiration) => {
        setToken(token);
        setUserId(id);
        setTokenExpiration(tokenExpiration)
    }
    const logout = () => {
        setToken("");
        setUserId("");
        setTokenExpiration("");
    }

    return (
        <AuthContext.Provider
            value = {{
                token, setToken, 
                userId, setUserId, 
                login, logout
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext