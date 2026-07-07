import DoughnutChart from "@/components/DoughnutChart";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import { mockAccounts, mockTransactions } from "@/lib/mock-data";
import { formatAmount } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  return (
    <div className="h-full flex">
      {/* Main Column */}
      <div className="flex flex-1 min-w-0 flex-col gap-8 py-12 px-8">
        {/* Welcome Header  */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome, <span className="gradient-text">Ahmed</span>
          </h1>
          <p className="text-gray-600">
            Access & manage your account and transactions efficiently.
          </p>
        </div>

        {/* Accounts Summary with Chart */}
        <div className="flex p-6 gap-6">
          <div className="size-30">
            <DoughnutChart accounts={mockAccounts} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-900 font-semibold">
                {mockAccounts.length} Bank Account{mockAccounts.length !== 1 ? "s" : ""}
              </p>
              <Link href="/connect-bank" className="text-sm font-medium text-[#0179FE]">
                + Add bank
              </Link>
            </div>
            <p className="text-sm text-gray-600">Total Current Balance</p>
            <p className="text-3xl font-bold text-gray-900">
                {formatAmount(totalBalance)}
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions
          accounts={mockAccounts}
          transactions={mockTransactions}
        />
      </div>

      {/* Right Panel */}
      <RightSidebar />
    </div>
  );
}
