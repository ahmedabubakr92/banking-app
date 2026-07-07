import BankCard from "@/components/BankCard";
import { mockAccounts, mockTransactions } from "@/lib/mock-data";
import { formatAmount, getAccountSpending } from "@/lib/utils";

const userName = "Ahmed AbuBakr";

export default function MyBank() {
  return (
    <div className="flex flex-col gap-8 py-12 px-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          My Bank Accounts
        </h1>
        <p className="text-gray-600">
          Effortlessly Manage Your Banking Activities
        </p>
      </div>
      {/* Cards Grid */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-gray-900">Your cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockAccounts.map((account) => {
            const spending = getAccountSpending(account.id, mockTransactions);
            const pct =
              account.monthlyBudget > 0
                ? Math.min((spending / account.monthlyBudget) * 100, 100)
                : 0;

            return (
              <div key={account.id} className="flex flex-col gap-4">
                <BankCard account={account} userName={userName} />

                <div className="flex flex-col gap-2 w-75.5">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-600">
                      Spending this month
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatAmount(spending)}
                    </p>
                  </div>
                  <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: account.chartColor,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
