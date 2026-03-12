import { v4 as uuidv4 } from "uuid";
import { urls, YahooAuthNonceKey, YahooAuthStateKey } from "./constants";
import { getEnvVariable } from "../utils/envUtils";

export function constructYahooLoginUrl() {
  const redirectUri = getEnvVariable("NEXT_PUBLIC_YAHOO_REDIRECT_URI");
  const clientId = getEnvVariable("NEXT_PUBLIC_YAHOO_CLIENT_ID");
  const envVariableError =
    "Yahoo Redirect URI or Client ID is not set in environment variables.";

  if (!redirectUri || !clientId) {
    throw new Error(envVariableError);
  }
  const state = uuidv4();
  sessionStorage.setItem(YahooAuthStateKey, state);
  const nonce = uuidv4();
  sessionStorage.setItem(YahooAuthNonceKey, nonce);

  const queryParams = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    state: state,
    scope: "openid",
    nonce: nonce,
  });
  return `${urls.yahooAuthorization}?${queryParams.toString()}`;
}
