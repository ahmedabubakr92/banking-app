import { z } from "zod";

const uaePhoneRegex = /^(?:\+?971|0)?(?:5[024568]|2|3|4|6|7|9)\d{7}$/;

const emiratesIdRegex = /^784-\d{4}-\d{7}-\d{1}$/;

function validateLuhn(digits: string): boolean {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10); // () not []
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters or less"),
});

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be 50 characters or less"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be 50 characters or less"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters or less"),
  confirmPassword: z.string(),
  phoneNumber: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s-]/g, ""))
    .refine(
      (val) => uaePhoneRegex.test(val),
      "Invalid UAE phone number. Use formats like +971 50 123 4567 or 0501234567",
    ),
  emiratesId: z
    .string()
    .regex(
      emiratesIdRegex,
      "Invalid Emirates ID format. Expected 784-YYYY-NNNNNNN-C",
    )
    .refine((val) => {
      const digits = val.replace(/-/g, "");
      return validateLuhn(digits);
    }, "Invalid Emirates ID"),
    nationality: z.string().min(1, "Nationality is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    dob: z.string().refine((value) => {
        const date = new Date(`${value}T00:00:00.000Z`);
        if (
            Number.isNaN(date.getTime()) || 
            date.toISOString().slice(0, 10) !== value ||
            date > new Date()
        ) return false;

        const age = new Date().getFullYear() - date.getFullYear()
        return age >= 18 && age <= 120;

    }, "Enter a valid date. You must be between 18 and 120 years old"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
