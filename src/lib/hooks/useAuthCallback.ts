import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { yahooAuthCallback } from "../api/yahooAuthService";
import { YahooAuthNonceKey, YahooAuthStateKey } from "../api/constants";
import logger from "../logger";

const useYahooAuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAuthCalled = useRef(false);
  const router = useRouter();
  const stateValidationErrorMessage = "Authentication failed. Please try again.";

  const getUrlParameter = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  };

  const validateParameters = (
    code: string | null,
    state: string | null,
    savedState: string | null,
    savedNonce: string | null
  ) => {
    if (!code) {
      logger.error("No authorization code found in URL.");
      setError(stateValidationErrorMessage);
      return false;
    }
    if (!savedNonce) {
      logger.error("No nonce found in session storage.");
      setError(stateValidationErrorMessage);
      return false;
    }
    if (state !== savedState) {
      logger.error("State mismatch. Potential CSRF attack or session issue.", { state, savedState });
      setError(stateValidationErrorMessage);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const code = getUrlParameter("code");
    const error = getUrlParameter("error");
    const state = getUrlParameter("state");
    const savedState = sessionStorage.getItem(YahooAuthStateKey);
    const savedNonce = sessionStorage.getItem(YahooAuthNonceKey);

    if (error) {
      logger.error("Authentication error received in URL.", { error });
      setError(stateValidationErrorMessage);
      setLoading(false);
      return;
    }

    if (!validateParameters(code, state, savedState, savedNonce)) {
      setLoading(false);
      return;
    }

    if (!hasAuthCalled.current && code && savedNonce) {
      hasAuthCalled.current = true;

      yahooAuthCallback(code, savedNonce)
        .then(() => {
          setLoading(false);
          router.push("/");
        })
        .catch((error) => {
          logger.error("Yahoo authentication callback failed.", { error });
          setError(stateValidationErrorMessage);
          setLoading(false);
        });
    }
  }, [router]);

  return { loading, error };
};

export default useYahooAuthCallback;
