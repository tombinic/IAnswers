import React, { createContext, useState } from "react";

const AuthContext = createContext({});



export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({success: false});

    return (
        <div>
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
        </div>
    )

}



export default AuthContext;

