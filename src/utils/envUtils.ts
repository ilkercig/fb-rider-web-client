// envUtils.ts
export function getEnvVariable(key: string): string | undefined {
    return import.meta.env[key];
  }
  