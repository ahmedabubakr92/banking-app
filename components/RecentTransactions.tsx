"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAccounts, mockTransactions } from "@/lib/mock-data";
import Link from "next/link";
import { formatAmount, getTransactionStatus } from "@/lib/utils";

type Props = {
  accounts: typeof mockAccounts;
  transactions: typeof mockTransactions;
};

const statusStyle = {
  Processing: "border-blue-500 text-blue-600",
  Pending: "border-yellow-500 text-yellow-600",
  Success: "border-green-500 text-green-600",
  Declined: "border-red-500 text-red-600",
};

const categoryStyles = {
  "Food and Dining": "border-red-500 text-red-600",
  Transport: "border-blue-500 text-blue-600",
  Utilities: "border-purple-500 text-purple-600",
  Subscriptions: "border-indigo-500 text-indigo-600",
  Salary: "border-green-500 text-green-600",
  Groceries: "border-orange-500 text-orange-600",
  Shopping: "border-pink-500 text-pink-600",
  Transfer: "border-yellow-500 text-yellow-600",
};

export default function RecentTransactions({ accounts, transactions }: Props) {
  const [selectedId, setSelectedId] = useState(accounts[0]?.id ?? "");

  const filtered = transactions.filter((t) => t.bankAccountId === selectedId);

  const selectedAccount = accounts.find((acc) => acc.id === selectedId);

  if (!selectedAccount) {
    return (
      <section className="flex flex-col gap-7.5">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <p className="text-sm text-gray-600">No linked accounts yet.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-7.5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <Link
          href={`/transaction-history?accountId=${selectedId}`}
          className="text-sm font-semibold text-gray-700 border border-gray-300 py-2.5 px-4 rounded-lg shadow-[0px_1px_2px_#1018280D]"
        >
          View all
        </Link>
      </div>
      {/* Tabs  */}
      <Tabs value={selectedId} onValueChange={setSelectedId}>
        <TabsList
          variant="line"
          className="w-full justify-start border-b border-gray-200 rounded-none p-0 h-auto gap-4"
        >
          {accounts.map((acc) => (
            <TabsTrigger
              key={acc.id}
              value={acc.id}
              className="rounded-none border-0 bg-transparent pt-0 px-1 pb-2.5 text-base font-semibold text-[#667085] shadow-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-transparent data-[state=active]:tab-active-border data-[state=active]:gradient-text after:hidden"
            >
              {acc.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedId} className="mt-6">
          {/* bank summary card + table come next */}
          <div
            className="flex items-center justify-between py-5 px-6 rounded-lg gap-[18px]"
            style={{ backgroundColor: "#F5FAFF" }}
          >
            <div className="flex items-center gap-4.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: selectedAccount.chartColor }}
              >
                {selectedAccount.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className="text-xl font-semibold"
                  style={{ color: "#194185" }}
                >
                  {selectedAccount.name}
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#1570EF" }}
                >
                  {formatAmount(selectedAccount.balance)}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 capitalize">
              {selectedAccount.type}
            </span>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-gray-200">
                  <th className="py-3 pl-3.5 text-left text-xs font-medium text-gray-600">
                    Transaction
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-3 text-left text-xs font-medium text-gray-600">
                    Date
                  </th>
                  <th className="py-3 pr-3.5 text-left text-xs font-medium text-gray-600">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => {
                  const status = tx.status ?? getTransactionStatus(tx.date);
                  const isCredit = tx.amount >= 0;
                  return (
                    <tr
                      key={tx.id}
                      style={{
                        backgroundColor: isCredit ? "#F6FEF9" : "#FFFBFA",
                      }}
                    >
                      <td className="py-3 pl-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                            {tx.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {tx.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`py-3 text-sm font-medium ${isCredit ? "text-green-600" : "text-red-500"}`}
                      >
                        {isCredit ? "+" : "-"}
                        {formatAmount(Math.abs(tx.amount))}
                      </td>
                      <td className="py-3 pr-3.5">
                        <span
                          className={`inline-flex items-center gap-1 border-[1.5px] rounded-2xl pl-1.5 pr-2 py-0.5 text-xs font-medium ${statusStyle[status]}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-current" />
                          {status}
                        </span>
                      </td>
                      <td className="py-3 pr-3.5 text-sm text-gray-500">
                        {tx.date.toLocaleDateString("en-AE", {
                          weekday: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 pr-3.5">
                        <span
                          className={`inline-flex items-center gap-1 border-[1.5px] rounded-2xl pl-1.5 pr-2 py-0.5 text-xs font-medium ${categoryStyles[tx.category]}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-current" />
                          {tx.category}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
