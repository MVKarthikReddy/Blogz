export const notifyType = (statusCode) => {
    if (statusCode === 404) {
      return statusCode//return "info";
    } 
    if (statusCode === 400 || statusCode === 409) {
      return statusCode //return "warning";
    }
    if (statusCode === 500) {
      return statusCode //return "error";
    }
    if (statusCode === 201) {
        return statusCode //return "error";
      }
    return 200;
  };