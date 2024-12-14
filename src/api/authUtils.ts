import { v4 as uuidv4 } from "uuid";
import { urls, YahooAuthNonceKey, YahooAuthStateKey } from "./costants";
import { getEnvVariable } from "../utils/envUtils";
export function constructYahooLoginUrl() {
  const redirectUri = getEnvVariable("FBRIDER_YAHOO_REDIRECT_URI");
  const clientId = getEnvVariable("FBRIDER_YAHOO_CLIENT_ID");
    const envVariableError =
      "Yahoo Redirect URI or Client ID is not set in environment variables.";    
  
    if (!redirectUri || !clientId) {
      throw new Error(envVariableError);
    }
    const state = uuidv4(); // Generate a unique state string
    sessionStorage.setItem(YahooAuthStateKey, state); // Store state in sessionStorage for validation
    const nonce = uuidv4(); // Generate a unique nonce string
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