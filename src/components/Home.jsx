import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context/userContext';
import { accountInfo } from '../services/user.service';
import Auth from './Auth';

export default function(props) {
    const {token} = useContext( UserContext )

    const [nombre, setNombre] = useState("...")

    const laodAccountInfo = async(token) => {
      const user = await accountInfo(token);
      if( user.status == 200 ) {
        setNombre(user.data.name);
      } 
    }

    useEffect(()=>{
      if(token != null)
        laodAccountInfo(token)
    }, [token])
  
    if(token != null) {
        return (
            <div className="container">
              <h1>Bienvenido {nombre}</h1>
            </div>
        )
    } else {
      return (
        <Auth />
      )
    }
}