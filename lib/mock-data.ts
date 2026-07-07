import { Transaction } from "@/types";

export const mockAccounts = [
  {
    id: "acc-001",
    name: "Emirates NBD",
    balance: 2588.12,
    lastFourDigits: "1234",
    chartColor: "#0179FE",
    type: "savings",
    monthlyBudget: 1000
  },
  {
    id: "acc-002",
    name: "Dubai Islamic Bank",
    balance: 110.0,
    lastFourDigits: "5678",
    chartColor: "#E52E6B",
    type: "current",
    monthlyBudget: 800
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    name: "Talabat",
    initials: "TA",
    amount: -67.5,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: "Food and Dining",
    bankAccountId: "acc-001",
  },
  {
    id: "txn-002",
    name: "Salary - Horizon Tech",
    initials: "HT",
    amount: 12000.0,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: "Salary",
    bankAccountId: "acc-001",
  },
  {
    id: "txn-003",
    name: "DEWA",
    initials: "DW",
    amount: -320.0,
    date: new Date(Date.now() - 10 * 60 * 60 * 1000),
    category: "Utilities",
    bankAccountId: "acc-001",
  },
  {
    id: "txn-004",
    name: "Careem",
    initials: "CR",
    amount: -18.75,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "Transport",
    bankAccountId: "acc-001",
  },
  {
    id: "txn-005",
    name: "Netflix",
    initials: "NF",
    amount: -44.99,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    category: "Subscriptions",
    bankAccountId: "acc-001",
  },
  {
    id: "txn-006",
    name: "Mohammed Rashid",
    initials: "MR",
    amount: -500.0,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: "Transfer",
    bankAccountId: "acc-001",
    status: "Declined",
  },
  {
    id: "txn-007",
    name: "LuLu Hypermarket",
    initials: "LU",
    amount: -180.0,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    category: "Groceries",
    bankAccountId: "acc-002",
  },
  {
    id: "txn-008",
    name: "Noon",
    initials: "NO",
    amount: -250.0,
    date: new Date(Date.now() - 15 * 60 * 60 * 1000),
    category: "Shopping",
    bankAccountId: "acc-002",
  },
];
