import axios from 'axios'

const API_URL = process.env.REACT_APP_API_HOST


export const accountInfo = async(token) => {
    var config = {
        "headers" : {
            "Authorization": "Bearer "+token
        }
    }
   
    const response = await axios.get(`${API_URL}/users/account`, config);
    console.log("api response", response);
    return response;
}

