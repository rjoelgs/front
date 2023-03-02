import React, {useState, useEffect, useContext} from 'react';
import { login, signup } from '../services/auth.service';
import { UserContext } from '../context/userContext';

export default function(props) {
    const {token, setupSession} = useContext( UserContext )
    let [mode, setMode] = useState("login")

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [nombre, setNombre] = useState("")
    let [edad, setEdad] = useState("")
    let [fechanac, setFechanac] = useState("")
    let [apellido, setApellido] = useState("")
    //let [token, setToken] = useState(null)

    var data = {
        "email": null
    }

    useEffect( ()=>{
        console.log("token", token);
    }, [] )




    const onChangeMode = () => {
        setMode( mode === "login" ? "register" : "login" )
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
        console.log("PASSWORD", password);

    }

    const onSubmitLogin = async(event) => {
        event.preventDefault();
        console.log(email, password);
        const response = await login(email, password);
        console.log("service responsed", response);
        if(response.status == 200){
            setupSession(response.data.result)
            console.log("TOKEN", token)
            //setToken(response.result);
            //redirect("home/")
        }
        //token -> null
    }

    const onSubmitSignup = async(event) => {
        event.preventDefault();
        console.log(email, password);
        const response = await signup(nombre, apellido, edad, fechanac, email, password);
        console.log("service responsed", response);
    }


    if(mode === "login") {
        return (
            <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={onSubmitLogin}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Ingreso</h3>
                <div className="text-center">
                ¿Aún no estas registrado?{" "}
                <span className="link-primary" onClick={onChangeMode} >
                    Registrarse
                </span>
                </div>
                <div className="form-group mt-3">
                <label>Email</label>
                <input
                    value={email}
                    type="email"
                    className="form-control mt-1"
                    placeholder="Ingresa tu email"
                    onChange={({target})=>setEmail(target.value)}
                />
                </div>
                <div className="form-group mt-3">
                <label>Contraseña</label>
                <input
                    value={password}
                    type="password"
                    className="form-control mt-1"
                    placeholder="Ingresa tu contraseña"
                    onChange={onChangePassword}
                />
                </div>
                <div className="form-group mt-3">
                    <label>Password:{password}</label>
                </div>
                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                    Entrar
                </button>
                </div>
            </div>
            </form>
        </div>
        )
    }


    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={onSubmitSignup}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Registro</h3>
              <div className="text-center">
                ¿Ya tienes una cuenta?{" "}
                <span className="link-primary" onClick={onChangeMode}>
                  Ingresar
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Nombre</label>
                <input
                    value={nombre}
                    type="text"
                    className="form-control mt-1"
                    placeholder="Tu nombre"
                    onChange={({target})=>setNombre(target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Apellido</label>
                <input
                    value={apellido}
                    type="text"
                    className="form-control mt-1"
                    placeholder="Tu primer apellido"
                    onChange={({target})=>setApellido(target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Edad</label>
                <input
                    value={edad}
                    type="number"
                    className="form-control mt-1"
                    placeholder="Tu edad"
                    onChange={({target})=>setEdad(target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Fecha de nacimiento</label>
                <input
                    value={fechanac}
                    type="date"
                    className="form-control mt-1"
                    placeholder="Tu fecha de nacimiento"
                    onChange={({target})=>setFechanac(target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Correo electrónico</label>
                <input
                    value={email}
                    type="email"
                    className="form-control mt-1"
                    placeholder="Tu correo"
                    onChange={({target})=>setEmail(target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Contraseña</label>
                <input
                    value={password}
                    type="password"
                    className="form-control mt-1"
                    placeholder="Tu contraseña"
                    onChange={({target})=>setPassword(target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
    )

}