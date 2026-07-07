import { z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/validations";

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export type DoughnutChartProps = {
  accounts: {
    name: string;
    balance: number;
    chartColor: string;
  }[];
};

export type TransactionCategory =
  | "Food and Dining"
  | "Transport"
  | "Utilities"
  | "Subscriptions"
  | "Groceries"
  | "Transfer"
  | "Salary"
  | "Shopping";

export type Transaction = {
  id: string;
  name: string;
  initials: string;
  amount: number;
  date: Date;
  category: TransactionCategory;
  bankAccountId: string;
  status?: "Declined";
};
