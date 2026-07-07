import { formatAmount } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  account: {
    name: string;
    balance: number;
    lastFourDigits: string;
    chartColor: string;
  };
  userName: string;
  className?: string;
};

function PaypassIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      className={className}
    >
      <path
        d="M15.1429 1.28571C17.0236 4.54326 18.0138 8.23849 18.0138 12C18.0138 15.7615 17.0236 19.4567 15.1429 22.7143M10.4286 3.64285C11.8956 6.18374 12.6679 9.06602 12.6679 12C12.6679 14.934 11.8956 17.8162 10.4286 20.3571M5.92859 5.80713C6.98933 7.66394 7.54777 9.77022 7.54777 11.9143C7.54777 14.0583 6.98933 16.1646 5.92859 18.0214M1.42859 8.14285C2.19306 9.29983 2.59834 10.6362 2.59834 12C2.59834 13.3638 2.19306 14.7002 1.42859 15.8571"
        stroke="currentColor"
        strokeWidth="2.57143"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg width="30" height="19" viewBox="0 0 30 19" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9053 16.4393C13.3266 17.77 11.2787 18.5733 9.04092 18.5733C4.04776 18.5733 0 14.5737 0 9.64C0 4.70625 4.04776 0.706665 9.04092 0.706665C11.2787 0.706665 13.3266 1.51 14.9053 2.84072C16.484 1.51 18.5319 0.706665 20.7697 0.706665C25.7629 0.706665 29.8106 4.70625 29.8106 9.64C29.8106 14.5737 25.7629 18.5733 20.7697 18.5733C18.5319 18.5733 16.484 17.77 14.9053 16.4393Z"
        fill="#ED0006"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9053 16.4393C16.8492 14.8007 18.0818 12.3626 18.0818 9.64C18.0818 6.91739 16.8492 4.47925 14.9053 2.84072C16.484 1.50999 18.5319 0.706665 20.7697 0.706665C25.7628 0.706665 29.8106 4.70625 29.8106 9.64C29.8106 14.5737 25.7628 18.5733 20.7697 18.5733C18.5319 18.5733 16.484 17.77 14.9053 16.4393Z"
        fill="#F9A000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9053 16.4393C16.8492 14.8008 18.0818 12.3627 18.0818 9.64007C18.0818 6.91748 16.8492 4.47936 14.9053 2.84082C12.9614 4.47936 11.7288 6.91748 11.7288 9.64007C11.7288 12.3627 12.9614 14.8008 14.9053 16.4393Z"
        fill="#FF5E00"
      />
    </svg>
  );
}

export default function BankCard({ account, userName, className }: Props) {
  return (
    <div
      className={cn(
        "relative w-[302px] h-[182px] overflow-hidden rounded-2xl p-4 flex flex-col justify-between shrink-0 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-1 before:ring-white/30 before:ring-inset",
        className,
      )}
      style={{
        background: `linear-gradient(to top right, color-mix(in srgb, ${account?.chartColor} 60%, black), ${account?.chartColor})`,
        boxShadow: "8px 10px 16px 0px #0000000D",
      }}
    >
      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between px-1 pt-1">
        <p className="text-base font-semibold text-white leading-normal">
          {account?.name}
        </p>
        <PaypassIcon className="text-white" />
      </div>

      {/* Bottom section */}
      <div className="relative z-10 flex items-end justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-end gap-1">
            <p className="text-xs font-semibold tracking-[0.6px] uppercase text-white">
              {userName}
            </p>
            <p className="ml-auto text-right text-xs font-semibold tracking-[0.6px] text-white tabular-nums">
              ●● / ●●
            </p>
          </div>
          <p className="text-base font-semibold tracking-[1px] text-white tabular-nums">
            ●●●● ●●●● ●●●● {account?.lastFourDigits}
          </p>
        </div>

        <div className="flex h-8 w-11.5 shrink-0 items-center justify-center rounded bg-white/10">
          <MastercardLogo />
        </div>
      </div>
    </div>
  );
}
