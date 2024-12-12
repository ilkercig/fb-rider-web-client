import axios from "axios";

const setupAxiosInterceptors = (redirectToLogin: () => void) => {
  axios.interceptors.response.use(
    (response) => response, // Return the response if successful
    (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        redirectToLogin(); // Call the redirection function
      }
      return Promise.reject(error); // Propagate the error
    }
  );
};

export default setupAxiosInterceptors;
