"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { LogOut } from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <section className="flex flex-col shrink-0 w-70 h-screen bg-white border-r border-gray-200 px-4 py-6">
      <nav className="flex flex-col gap-1">
        <Link href="/" className="flex items-center gap-[3.5px] mb-8">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={34}
            height={34}
          />
          <span className="font-heading font-bold text-[28px] leading-7.5 text-[#00214F]">
            Horizon
          </span>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              href={item.route}
              key={item.route}
              className={`flex items-center h-14 gap-3 px-3 py-2 rounded-lg ${isActive ? "sidebar-active-gradient text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.label}
                width={24}
                height={24}
                className={isActive ? "brightness-0 invert" : ""}
              />
              <p className="font-sans font-semibold text-base leading-6">
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto min-h-24 flex items-center gap-3 px-3 pt-4 border-t border-gray-200">
        <Image 
          src="/profile.jpeg"
          alt="Ahmed's profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold font-sans leading-5 text-gray-700 truncate">Ahmed Abubakr</p>
            <p className="text-sm leading-5 text-gray-600 truncate">ahmedabubakr92@gmail.com</p>
        </div>
        <LogOut width={16} height={16} className="ml-auto shrink-0 text-gray-600"/>
      </div>
    </section>
  );
}
