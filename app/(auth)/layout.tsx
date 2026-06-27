import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh">
      <section className="flex flex-1 flex-col justify-center items-center">
        {children}
      </section>
      <div className="hidden lg:flex flex-1 flex-col justify-center bg-sky-50 pl-24 py-34.75">
        <Image
          src="/dashboard-preview.png"
          alt="Dashboard preview showing Horizon's home dashboard with sidebar, balance, and transactions"
          width={938}
          height={682}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>
    </main>
  );
}
