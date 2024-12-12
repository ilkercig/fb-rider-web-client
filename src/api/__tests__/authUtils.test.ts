// yahooAuthService.test.ts
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { getEnvVariable } from "../../utils/envUtils";
import { v4 as uuidv4 } from "uuid";
import { constructYahooLoginUrl } from "../authUtils";
import { urls, YahooAuthNonceKey, YahooAuthStateKey } from "../costants";
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

// Mock the getEnvVariable function
jest.mock("../../utils/envUtils", () => ({
  getEnvVariable: jest.fn(),
}));

describe("constructYahooLoginUrl", () => {
  const mockRedirectUri = "http://localhost/callback";
  const mockClientId = "test-client-id";
  const mockState = "mock-state";
  const mockNonce = "mock-nonce";

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock uuidv4 to return predictable values
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce(mockState)
      .mockReturnValueOnce(mockNonce);

    // Mock getEnvVariable to return values for the test
    (getEnvVariable as jest.Mock).mockImplementation((key: unknown) => {
      if (key === "VITE_YAHOO_REDIRECT_URI") return mockRedirectUri;
      if (key === "VITE_YAHOO_CLIENT_ID") return mockClientId;
      return undefined;
    });

    // Mock sessionStorage.setItem
    Object.defineProperty(window, "sessionStorage", {
      value: {
        setItem: jest.fn(),
      },
    });
  });

  it("should construct a valid Yahoo login URL", () => {
    const url = constructYahooLoginUrl();
    expect(url).toContain(encodeURIComponent(mockRedirectUri));
    expect(url).toContain(mockClientId);
    expect(url).toContain(mockState);
    expect(url).toContain(mockNonce);
    expect(url).toContain(urls.yahooAuthorization);
    // Verify that sessionStorage.setItem was called with correct parameters
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      YahooAuthStateKey,
      mockState
    );
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      YahooAuthNonceKey,
      mockNonce
    );
  });

  it("should throw an error if redirect URI is missing", () => {
    // Mock the missing redirect URI
    (getEnvVariable as jest.Mock)
      .mockImplementationOnce(() => undefined)
      .mockImplementationOnce(() => mockClientId);

    expect(() => constructYahooLoginUrl()).toThrow(
      "Yahoo Redirect URI or Client ID is not set in environment variables."
    );
  });

  it("should throw an error if client ID is missing", () => {
    // Mock the missing client ID
    (getEnvVariable as jest.Mock)
      .mockImplementationOnce(() => mockRedirectUri)
      .mockImplementationOnce(() => undefined);

    expect(() => constructYahooLoginUrl()).toThrow(
      "Yahoo Redirect URI or Client ID is not set in environment variables."
    );
  });
});
