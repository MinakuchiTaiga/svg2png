export function sanitizePositiveInt(input: string): number | null {
  if (!input.trim()) {
    return null;
  }

  const parsed = Number.parseInt(input, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}
