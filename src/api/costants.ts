import { getEnvVariable } from "../utils/envUtils";

export const urls = {
  yahooAuthorization: "https://api.login.yahoo.com/oauth2/request_auth",
};

export const backEndUrl = getEnvVariable("VITE_BACKEND_URI");

export const endPoints = {
  authCallback: `${backEndUrl}/api/yahooauth/callback`,
  authStatus: `${backEndUrl}/api/yahooauth/status`,
  userData: `${backEndUrl}/api/yahooauth/me`,
  logout: `${backEndUrl}/api/yahooauth/logout`,
  userLeagues: `${backEndUrl}/api/user/leagues`,
  userTeam: (leagueKey: string) =>
    `${backEndUrl}/api/leagues/${leagueKey}/user/team`,
  leagueSettings: (leagueKey: string) =>
    `${backEndUrl}/api/leagues/${leagueKey}/settings`,
  allPlayStandings: (leagueKey: string) =>
    `${backEndUrl}/api/leagues/${leagueKey}/allplay/standings`,
};

export const YahooAuthStateKey = "yahoo_auth_state";
export const YahooAuthNonceKey = "yahoo_auth_nonce";
