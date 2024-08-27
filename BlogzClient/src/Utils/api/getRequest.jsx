import notify from '../notifier/Notifier';
import { notifyType } from '../notifier/NotificationType';


const getRequest = async (path) => {


    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}${path}`,
            {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            }
        )
        const res = await response.json()
        console.log(res);
        notify(response["message"], notifyType(response.status));
        return res;

    } catch (error) {
        notify(error, "error");
    }
   
}

export default getRequest