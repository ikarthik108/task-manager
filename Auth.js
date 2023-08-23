import { useState,createContext,useContext,useEffect } from "react";
import {getAuth} from 'firebase/auth'
import Login from "./components/Login";
import { useRouter } from 'next/router'
const AuthContext=createContext({});


export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const router = useRouter()
useEffect(()=> {
    const auth =getAuth();
    return auth.onIdTokenChanged(async(user)=> {
        if(!user) {
            setCurrentUser(null)
            setLoading(false)
            return;
        }
        const token =await user.getIdToken();
        setCurrentUser(user)
        setLoading(false)
    })
},[])
if(loading) {
    return <div></div>
} 
if(!currentUser) {
    return (
        <Login/>
    )
   
} else {
    return (
        <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
    )
}

}

export const useAuth=()=>useContext(AuthContext)