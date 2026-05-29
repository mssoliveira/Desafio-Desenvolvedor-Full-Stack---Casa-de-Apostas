export function normalizeFullName(fullName: string): string {
  return fullName.trim().replace(/\s+/g, ' ').toLowerCase();
}
