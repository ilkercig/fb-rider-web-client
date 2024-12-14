import { getEnvVariable } from "../utils/envUtils";

export const urls = {
  yahooAuthorization: "https://api.login.yahoo.com/oauth2/request_auth",
};

export const backEndUrl = getEnvVariable("VITE_BACKEND_URI");

export const endPoints = {
  authCallback: backEndUrl + "/api/yahooauth/callback",
  authStatus: backEndUrl + "/api/yahooauth/status",
  userData: backEndUrl + "/api/yahooauth/me",
  logout: backEndUrl + "/api/yahooauth/logout",
  leagues: backEndUrl + "/api/leagues",
};

export const YahooAuthStateKey = "yahoo_auth_state";
export const YahooAuthNonceKey = "yahoo_auth_nonce";
