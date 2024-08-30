import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
const notify = (message, type) => {
    // console.log("Error message:",message)
    console.log(message, type)
    const msg = message || "Bad Request!"
    switch (type) {
        case 200:
            toast.success(message, options);
            break;
        case 201:
            toast.success(message, options);
            break;
        case 404:
            toast.error(message, options);
            break;
        case 400:
            toast.info(message, options);
            break;
        case 401:
            toast.info(msg, options);
            break;
        case 403:
            toast.info(message, options);
            break;
        case 409:
            toast.info(message, options);
            break
        case 500:
            toast.error(message, options);
            break
        default:
            break;
    }
  
};

export default notify