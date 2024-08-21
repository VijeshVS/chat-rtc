import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;;

export async function register(username,password){
    const res = await axios.post(BACKEND_URL+'/api/v1/auth/register',{
        username,
        password
    })

    if(res.status == 200){
        return {
            status:res.status,
            token:res.data.token
        }
    } else {
        return {
            status:res.status,
            token:""
        }
    }
}

export async function login(username,password){
    const res = await axios.post(BACKEND_URL + '/api/v1/auth/login',{
        username,
        password
    })
    
    if(res.status == 200){
        return {
            status:res.status,
            token:res.data.token
        }
    } else {
        return {
            status:res.status,
            token:""
        }
    }
}

export async function isLoggedIn(token){
   
    const res = await axios.get(BACKEND_URL + '/api/v1/auth/hasLoggedIn',{
            headers:{
                token
            }
    })
    
    return res.data;
    
}