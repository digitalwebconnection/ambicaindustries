/**
 * Reusable Form Validation Utilities (Client-Side UX Layer)
 * Ambica Industries
 *
 * NOTE: These validation helpers are strictly for client-side user experience (UX),
 * immediate feedback, and accessibility. They do NOT serve as a security boundary.
 * Authoritative schema validation, rate-limiting, and bot defense must run on the server.
 * See server_validation_and_spam_protection_plan.md for the complete backend specification.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Standardized Form Field Requirements across all Ambica forms:
 * - name / firstName: Required (min 2 chars, letters and spaces only)
 * - email: Required (valid email format)
 * - phone: Required (valid format, 7-15 digits) across all forms for B2B outreach
 * - company: Optional across all forms (if provided, min 2 chars)
 * - city: Optional across all forms (if provided, min 2 chars)
 * - country: Required where present (Enquiry form)
 * - service: Required where present (Contact form)
 * - message: Required (min 10 chars, max 2000 chars)
 */
export const FIELD_REQUIREMENTS = {
  name: { required: true, minLength: 2, maxLength: 70 },
  email: { required: true },
  phone: { required: true, minDigits: 7, maxDigits: 15 },
  company: { required: false, minLength: 2, maxLength: 100 },
  city: { required: false, minLength: 2, maxLength: 80 },
  country: { required: true },
  service: { required: true },
  message: { required: true, minLength: 10, maxLength: 2000 },
} as const;

// Regex for standard email verification
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex for letters, spaces, hyphens, and apostrophes
const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;

// Regex for phone characters (digits, +, -, (, ), spaces)
const PHONE_CHAR_REGEX = /^[+]?[\d\s().-]{7,20}$/;

/**
 * Validates full name or first/last name
 */
export function validateName(name: string, fieldName = "Name", minLength = 2): string | null {
  const trimmed = (name || "").trim();
  if (!trimmed) {
    return `${fieldName} is required`;
  }
  if (trimmed.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  if (trimmed.length > 70) {
    return `${fieldName} cannot exceed 70 characters`;
  }
  if (!NAME_REGEX.test(trimmed)) {
    return `${fieldName} can only contain letters, spaces, and hyphens`;
  }
  return null;
}

/**
 * Validates optional name (only validates if user typed something)
 */
export function validateOptionalName(name: string, fieldName = "Name"): string | null {
  const trimmed = (name || "").trim();
  if (!trimmed) return null;
  if (trimmed.length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  if (!NAME_REGEX.test(trimmed)) {
    return `${fieldName} can only contain letters, spaces, and hyphens`;
  }
  return null;
}

/**
 * Validates email address format
 */
export function validateEmail(email: string): string | null {
  const trimmed = (email || "").trim();
  if (!trimmed) {
    return "Email address is required";
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Please enter a valid email address (e.g. name@company.com)";
  }
  return null;
}

/**
 * Validates phone numbers (supports Indian & International formats)
 */
export function validatePhone(phone: string, required = false): string | null {
  const trimmed = (phone || "").trim();
  if (!trimmed) {
    return required ? "Phone number is required" : null;
  }
  
  if (!PHONE_CHAR_REGEX.test(trimmed)) {
    return "Please enter a valid phone number (digits, spaces, + or -)";
  }

  // Count raw digits
  const digitCount = trimmed.replace(/\D/g, "").length;
  if (digitCount < 7 || digitCount > 15) {
    return "Phone number must contain between 7 and 15 digits";
  }

  return null;
}

/**
 * Validates required text inputs (company, subject, etc.)
 */
export function validateRequired(value: string, fieldName: string, minLength = 2): string | null {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return `${fieldName} is required`;
  }
  if (trimmed.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
}

/**
 * Validates optional text input (if provided, must meet minLength)
 */
export function validateOptionalText(value: string, fieldName: string, minLength = 2): string | null {
  const trimmed = (value || "").trim();
  if (!trimmed) return null;
  if (trimmed.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
}

/**
 * Validates dropdown selects
 */
export function validateSelect(value: string, fieldName: string): string | null {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return `Please select a ${fieldName.toLowerCase()}`;
  }
  return null;
}

/**
 * Validates message / inquiry requirements text
 */
export function validateMessage(message: string, minLength = 10, maxLength = 2000): string | null {
  const trimmed = (message || "").trim();
  if (!trimmed) {
    return "Please describe your requirement or message";
  }
  if (trimmed.length < minLength) {
    return `Please enter at least ${minLength} characters so we can better assist you`;
  }
  if (trimmed.length > maxLength) {
    return `Message cannot exceed ${maxLength} characters`;
  }
  return null;
}

/**
 * Single source of truth for field validation across all Ambica forms:
 * Ensures identical rules for required vs optional, min/max lengths, and regex formats.
 */
export function validateStandardField(fieldName: string, value: string): string | null {
  switch (fieldName) {
    case "name":
      return validateName(value, "Name", FIELD_REQUIREMENTS.name.minLength);
    case "firstName":
      return validateName(value, "First name", FIELD_REQUIREMENTS.name.minLength);
    case "lastName":
      return validateOptionalName(value, "Last name");
    case "email":
      return validateEmail(value);
    case "phone":
      return validatePhone(value, FIELD_REQUIREMENTS.phone.required);
    case "company":
      return validateOptionalText(value, "Company name", FIELD_REQUIREMENTS.company.minLength);
    case "city":
      return validateOptionalText(value, "City", FIELD_REQUIREMENTS.city.minLength);
    case "country":
      return validateSelect(value, "Country");
    case "service":
      return validateSelect(value, "Product or Service");
    case "message":
      return validateMessage(
        value,
        FIELD_REQUIREMENTS.message.minLength,
        FIELD_REQUIREMENTS.message.maxLength
      );
    default:
      return null;
  }
}

