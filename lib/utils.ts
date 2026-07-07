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

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getTransactionStatus(
  date: Date,
): "Pending" | "Processing" | "Success" {
  const diffHours = (Date.now() - date.getTime()) / (1000 * 60 * 60);

  if (diffHours < 0.05) return "Processing"; // within ~3 min - IPI settling
  if (diffHours < 24) return "Pending"; // within 24h - cooling period or UAEFTS
  return "Success";
}

export function countSpendingByCategory(
  transactions: { amount: number; category: string }[],
) {
  const totals = transactions.reduce<Record<string, number>>((acc, tx) => {
    if (tx.amount < 0) {
      acc[tx.category] = (acc[tx.category] ?? 0) + Math.abs(tx.amount);
    }
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
}
