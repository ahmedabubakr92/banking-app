"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validations";
import { SignInFormData } from "@/types";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignInFormData) {
      // TODO: POST to /api/auth/sign-in
  }

  return (
    <>
        
      <Link href="/" className="w-full max-w-90 flex items-center gap-[3.5px]">
        <Image
          src="/icons/logo.svg"
          alt="Horizon logo"
          width={34}
          height={34}
        />
        <span className="font-heading font-bold text-[30px] leading-7.5 text-[#00214F]">
          Horizon
        </span>
      </Link>

      <div className="flex flex-col w-full max-w-90 gap-8">
        <div className="mt-10 flex flex-col gap-3 ">
          <h1 className="text-4xl font-bold font-sans text-gray-900">Log in</h1>
          <p className="text-base font-normal text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg sidebar-active-gradient py-4 leading-6 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-blue-500  hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
