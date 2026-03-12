const env: Record<string, string | undefined> = {
  NEXT_PUBLIC_BACKEND_URI: process.env.NEXT_PUBLIC_BACKEND_URI,
  NEXT_PUBLIC_YAHOO_REDIRECT_URI: process.env.NEXT_PUBLIC_YAHOO_REDIRECT_URI,
  NEXT_PUBLIC_YAHOO_CLIENT_ID: process.env.NEXT_PUBLIC_YAHOO_CLIENT_ID,
}

export function getEnvVariable(key: string): string | undefined {
  return env[key]
}
