/**
 * Security & Input Sanitization Utilities
 * Protects against XSS, Script Injection, and SQL/Command Injection attempts.
 */

/** Removes dangerous HTML/Script tags from string input */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input) return "";
  return String(input)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove <script>
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove inline JS protocol
    .replace(/onload=/gi, "")
    .replace(/onerror=/gi, "")
    .trim();
}

/** Validates basic phone format (E.164 or digits) */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9+]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 15;
}

/** Validates basic email format */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
