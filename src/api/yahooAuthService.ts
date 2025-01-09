import {
  endPoints,
} from "./costants";
import axios, { AxiosRequestConfig } from "axios";
import { AllPlayStandings, AllPlayStandingsSchema, FantasyLeague, FantasyTeam, LeagueSettings, LeagueSettingsSchema, YahooUser, YahooUserSchema } from "./types";
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
    // Ensure withCredentials is set to true by default
    const finalConfig: AxiosRequestConfig = {
      ...config,
      withCredentials: config.withCredentials ?? true, // Use true unless explicitly set
    };

    logger.trace(`Performing request: ${context}`, { url: config.url, method: config.method });

    const response = await axios(finalConfig);

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
        method: "GET"
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
      data: {}
    },
    "Logout"
  );
};

export const fetchUserLeagues = async (): Promise<FantasyLeague[]> => {
  return performRequest(
    {
      url: endPoints.userLeagues,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      params: { scoring: "head" },
    },
    "Fetch User Leagues"
  );
};

export const fetchUserTeamByLeague = async (leagueKey: string): Promise<FantasyTeam>  => {
  return performRequest(
    {
      url: `${endPoints.userTeam}?leagueKey=${leagueKey}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    "Fetch User Team By League Key"
  );
}

/**
 * Fetches league settings, including stat categories, from the backend.
 * @param leagueKey The key identifying the league.
 * @returns LeagueSettings object containing stat categories and other settings.
 */
export const fetchLeagueSettings = async (leagueKey: string): Promise<LeagueSettings> => {
  return performRequest(
    {
      url: endPoints.leagueSettings(leagueKey),
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    "Fetch League Settings",
    LeagueSettingsSchema.parse // Use schema validation
  );
};


export const fetchBeastStandings = async (leagueKey: string): Promise<AllPlayStandings> => {
  return performRequest(
    {
      url: endPoints.allPlayStandings(leagueKey),
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    "Fetch Beast Standings",
    AllPlayStandingsSchema.parse // Use schema validation
  );
};
