
export const urls = {
  yahooAuthorization: "https://api.login.yahoo.com/oauth2/request_auth",
};

export const endPoints = {
  authCallback: "/api/yahooauth/callback",
  authStatus: "/api/yahooauth/status",
  userData: "/api/yahooauth/me",
  logout: "/api/yahooauth/logout",
  leagues: "/api/leagues",
};

export const YahooAuthStateKey = "yahoo_auth_state";
export const YahooAuthNonceKey = "yahoo_auth_nonce";
