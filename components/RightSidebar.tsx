import Link from "next/link";
import Image from "next/image";
import BankCard from "@/components/BankCard";
import { countSpendingByCategory, formatAmount } from "@/lib/utils";
import { mockAccounts, mockTransactions } from "@/lib/mock-data";

const accounts = mockAccounts;
const transactions = mockTransactions;
const userName = "Ahmed AbuBakr";
const userEmail = "ahmedabubakr92@gmail.com";

const spending = countSpendingByCategory(transactions);

const categoryDotColor: Record<string, string> = {
  "Food and Dining": "bg-red-500",
  Transport: "bg-blue-500",
  Utilities: "bg-purple-500",
  Subscriptions: "bg-indigo-500",
  Salary: "bg-green-500",
  Groceries: "bg-orange-500",
  Shopping: "bg-pink-500",
  Transfer: "bg-yellow-500",
};

export default function RightSidebar() {
  return (
    <aside className="w-87.5 shrink-0 border-l border-gray-200 flex flex-col gap-8 overflow-y-auto">
      {/* Profile — banner extends full width, avatar overlaps it */}
      <section className="flex flex-col">
        <div
          className="h-20 w-full"
          style={{ background: "linear-gradient(135deg, #0179FE, #4893FF)" }}
        />
        <div className="flex flex-col items-center gap-2 px-6 -mt-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src="/profile.jpeg"
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">{userName}</p>
            <p className="text-sm text-gray-600">{userEmail}</p>
          </div>
        </div>
      </section>

      {/* My Banks */}
      <section className="flex flex-col gap-5 px-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">My Banks</h3>
          <Link
            href="/connect-bank"
            className="text-sm font-semibold text-gray-600"
          >
            + Add bank
          </Link>
        </div>

        <div className="relative w-70 mx-auto" style={{ height: "194px" }}>
          <div className="relative z-10">
            <BankCard account={accounts[0]} userName={userName} />
          </div>
          {accounts[1] && (
            <div className="absolute right-0 top-8 z-0 w-[90%]">
              <BankCard account={accounts[1]} userName={userName} />
            </div>
          )}
        </div>
      </section>

      {/* Top Spending */}
      <section className="flex flex-col gap-4 px-6 pb-10">
        <h3 className="font-semibold text-gray-900">Top Spending</h3>
        {spending.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${categoryDotColor[item.name] ?? "bg-gray-400"}`}
              />
              <p className="text-sm text-gray-700">{item.name}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatAmount(item.total)}
            </p>
          </div>
        ))}
      </section>
    </aside>
  );
}
