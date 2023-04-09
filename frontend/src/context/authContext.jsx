import { createContext } from "react";


export const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    authenticated: false,
    setAuthentication: () => {},
    logOut: () => {}
})