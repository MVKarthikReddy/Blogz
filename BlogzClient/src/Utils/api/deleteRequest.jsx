import axios from 'axios'
import notify from '../notifier/Notifier';
import { notifyType } from '../notifier/NotificationType';


const deleteRequest = async (path,token) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}${path}`,
            {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
            }
        )
        
        notify(response["message"], notifyType(response.status));
        return response;

    } catch (error) {
        notify(error, "error");
    }
   
}

export default deleteRequest