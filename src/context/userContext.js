import React, {useEffect, useState} from 'react'

const UserContext = React.createContext()

const {Provider, Consumer} = UserContext

const STORAGE_KEY = "token"

const UserProvider = ({children}) => {
    const [token, setToken] = useState(null)

    useEffect( () => {
        let storedToken = localStorage.getItem(STORAGE_KEY)
        if(storedToken) {
            setToken(storedToken)
        }
    }, [token] )

    const setupSession = (token) => {
        localStorage.setItem(STORAGE_KEY, token)
        setToken(token)
    }

    const deleteSession = () => {
        localStorage.removeItem(STORAGE_KEY)
        setToken(null)
    }

    return (
        <Provider value={{token, setupSession, deleteSession}}>
            {children}
        </Provider>
    )
}

export {UserProvider, Consumer as UserConsumer, UserContext}