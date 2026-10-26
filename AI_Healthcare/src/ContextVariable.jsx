import { createContext, useEffect, useState } from "react"
import { API } from "./Axios";

export const userDateContext = createContext()

export const ContextVariable = ({children})=>{
    const [profile , setProfile] = useState(null);
    useEffect(()=>{
        const profileData = async () => {
            const data = API.get("/profile")
            console.log(data)
        }
        },[])

    return <userDateContext.Provider value = {profile}>
        {children}
    </userDateContext.Provider>
}