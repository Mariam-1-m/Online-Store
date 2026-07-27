import axios from "axios";

export const handleError = (error) => {
  const message = axios.isAxiosError(error)
    ? error.response?.data?.message || (!error.response && "Network error please check your connection") || error.message
    : error instanceof Error
    ? error.message
    : "internal server error occurred";

  return {
    message,
    success: false,
  };
};