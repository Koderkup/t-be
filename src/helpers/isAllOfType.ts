export function isAllOfType(value: unknown, type: string): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === type);
}
