/** Read an environment variable, treating empty or blank values as "not set". */
export function env(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}
