import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function addContact(digitalNumber,token){
    const res = await axios.post(BACKEND_URL+'/api/v1/user/contact/add',{
        digitalNumber
    },{
        headers:{
            token
        }
    })

    if(res.status == 200){
        return {
            status: res.status,
            user: res.data
        }
    }
    else{
        return {
            status:res.status,
            user : {}
        }
    }
}