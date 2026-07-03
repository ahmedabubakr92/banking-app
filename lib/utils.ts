import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const first = Object.values(error).flat()[0];
    if (typeof first === "string") return first;
  }
  return fallback;
}
