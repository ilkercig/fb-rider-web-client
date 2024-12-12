import { AxiosError } from "axios";
import logger from "loglevel";

// Categorize the error type
const handleError = (error: unknown, context: string) => {
  if (error instanceof AxiosError) {
    handleAxiosError(error, context);
  } else if (error instanceof Error && error.name === "ValidationError") {
    handleValidationError(error, context);
  } else {
    handleGenericError(error, context);
  }
};

// Handle Axios errors
const handleAxiosError = (error: AxiosError, context: string) => {
  if (error.response) {
    // Handle HTTP error (status code, error details)
    logger.error(`${context} - Axios HTTP Error: ${error.message}`, {
      status: error.response?.status,
      data: error.response?.data,
    });
  } else if (error.request) {
    // Handle no response received (e.g., network issues)
    logger.error(`${context} - Network Error: ${error.message}`, {
        url: error.request?.url,
        method: error.request?.method,
    });
  } else {
    // Handle other Axios-related issues
    logger.error(`${context} - Axios Request Error: ${error.message}`, {
      config: error.config,
    });
  }
};

// Handle validation errors (e.g., schema validation)
const handleValidationError = (error: Error, context: string) => {
  logger.error(`${context} - Validation Error: ${error.message}`, {
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

// Handle all other generic errors
const handleGenericError = (error: unknown, context: string) => {
  if (error instanceof Error) {
    logger.error(`${context} - Generic Error: ${error.message}`, {
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    });
  } else {
    logger.error(`${context} - Unknown Error`, { error });
  }
};

export default handleError;
