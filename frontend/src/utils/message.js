import axios from 'axios'

const BACKEND_URL = process.env.BACKEND_URL
export async function getConversation(to,token){
    const res = await axios.post(BACKEND_URL+'/api/v1/message/conversation',{
        to
    },{
        headers:{
            token
        }
    })

    if(res.status == 200){
        return {
            status: res.status,
            messages: res.data.messages
        }
    }
    else{
        return {
            status: res.status,
            messages: []
        }
    }
}