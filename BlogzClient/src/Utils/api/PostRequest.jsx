import axios from 'axios'
import notify from '../notifier/Notifier';
import { notifyType } from '../notifier/NotificationType';


const postRequest = async (data,path,token) => {

    console.log(token)

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}${path}`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            }
        )
        
        console.log(response);
        notify(response["message"], notifyType(response.status));
        return response;

    } catch (error) {
        notify(error, "error");
    }
   
}

export default postRequest