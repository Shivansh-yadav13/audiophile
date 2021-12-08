export const errorStatus = (error) => {
  const status = error.response?.status;
  switch (status) {
    case 403:
      return "Incorrect Email/Password.";
    case 401:
      return "Unauthorised.";
    case 404:
      return "Not Found.";
    case 409:
      return "Email Already Taken.";
    case 400:
      return "Please Respect Policies.";
    default:
      return "Connection Failed.";
  }
};
