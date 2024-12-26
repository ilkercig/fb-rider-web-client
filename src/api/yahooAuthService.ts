import {
  endPoints,
} from "./costants";
import axios, { AxiosRequestConfig } from "axios";
import { YahooUser, YahooUserSchema } from "./types";
import logger from "../logger";
import handleError from "./handlerError";



/**
 * Generic function to perform API requests with error handling and validation.
 * @param config Axios request configuration.
 * @param context Context for logging and error categorization.
 * @param validate Optional validation function for the response data.
 */
async function performRequest<T>(
  config: AxiosRequestConfig,
  context: string,
  validate?: (data: unknown) => T
): Promise<T> {
  try {
    logger.trace(`Performing request: ${context}`, { url: config.url, method: config.method });

    const response = await axios(config);

    logger.trace(`Request successful: ${context}`, { responseData: response.data });

    if (validate) {
      return validate(response.data);
    }

    return response.data as T;
  } catch (error) {
    handleError(error, context);
    throw error; // Re-throw the error to propagate
  }
}

// Refactored Functions
export async function yahooAuthCallback(code: string, nonce: string) {
  return performRequest(
    {
      url: endPoints.authCallback,
      method: "POST",
      data: { code, nonce },
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    },
    "Yahoo Auth Callback"
  );
}

export const checkAuthentication = async (): Promise<boolean> => {
  try {
    const response = await performRequest<boolean>(
      {
        url: endPoints.authStatus,
        method: "GET",
        withCredentials: true,
      },
      "Authentication Check"
    );
    return response;
  } catch {
    return false; // Assume not authenticated on error
  }
};

export const fetchUserData = async (): Promise<YahooUser> => {
  return performRequest(
    {
      url: endPoints.userData,
      method: "GET",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    },
    "Fetch User Data",
    YahooUserSchema.parse // Use the schema for validation
  );
};

export const logout = async () => {
  return performRequest(
    {
      url: endPoints.logout,
      method: "POST",
      data: {},
      withCredentials: true,
    },
    "Logout"
  );
};
