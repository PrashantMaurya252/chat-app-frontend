import { createContext, useEffect, useState } from "react"


const mainContext = createContext()

const GlobalContext = ({children}) => {
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    const logout = ()=>{
        setUser(null)
        setToken(null)
        setIsLoggedIn(false)
        localStorage.setItem("token","")
        localStorage.setItem("user","")
    }

    useEffect(()=>{
        const currentToken = localStorage.getItem("token")
        const currentUser = localStorage.getItem("user")

        if(currentToken && currentUser){
            setIsLoggedIn(true)
            setUser(JSON.parse(currentUser))
            setToken(currentToken)
        }else{
            setIsLoggedIn(false)
        }
    },[])

    const globalVariable = {
        user:user,
        setUser:setUser,
        token:token,
        setToken:setToken,
        logout:logout,
        isLoggedIn:isLoggedIn
    }
  return (
    <mainContext.Provider value={globalVariable}>
        {children}
    </mainContext.Provider>
  )
}

export default GlobalContext