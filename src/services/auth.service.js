import axios from 'axios'

const API_URL = process.env.REACT_APP_API_HOST


export const login = async(email, password) => {
    var data = {
        "email": email,
        "password": password
    }
    const response = await axios.post(`${API_URL}/auth/login`, data);
    console.log("api response", response);
    return response;
}

export const signup = async(nombre, apellido, edad, fecha, email, password) => {
    
    var data = {
        "name": nombre,
        "lastname": apellido,
        "age": edad,
        "dob": fecha,
        "email": email,
        "password" : password
    }
    const response = await axios.post(`${API_URL}/users`, data);
    console.log("api response", response);
    return response;
}
