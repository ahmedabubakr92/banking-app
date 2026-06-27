"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/validations";
import { SignUpFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(data: SignUpFormData) {
    console.log("Sign up data:", data);
  }
  return (
    <section className="min-h-dvh flex flex-1 flex-col justify-center items-center gap-10">
      <Link href="/" className="w-full max-w-115 flex items-center gap-[3.5px]">
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

      <div className="w-full max-w-115 flex flex-col justify-start gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold text-gray-900 leading-11">
            Sign up
          </h1>
          <p className="text-gray-600">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* First Name & Last Name */}
          <div className="flex flex-1 gap-4.5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="ex: Ahmed"
                {...register("firstName")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="ex: Abubakr"
                {...register("lastName")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          {/* Addres */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="ex: Flat 1402, Marina Heights Tower, Dubai Marina"
              {...register("address")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>
          {/* City + Nationality */}
          <div className="flex gap-4.5">
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="ex: Dubai"
                {...register("city")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nationality"
                className="text-sm font-medium text-gray-700"
              >
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                placeholder="ex: Sudan"
                {...register("nationality")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.nationality && (
                <p className="text-xs text-red-500">
                  {errors.nationality.message}
                </p>
              )}
            </div>
          </div>
          {/* Date of Birth & Emirates ID */}
          <div className="flex gap-4.5">
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                {...register("dob")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dob && (
                <p className="text-xs text-red-500">{errors.dob.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="emiratesId"
                className="text-sm font-medium text-gray-700"
              >
                Emirates ID
              </label>
              <input
                id="emiratesId"
                type="text"
                placeholder="784-YYYY-NNNNNNN-C"
                {...register("emiratesId")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.emiratesId && (
                <p className="text-xs text-red-500">
                  {errors.emiratesId.message}
                </p>
              )}
            </div>
          </div>
          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="ex: +971 50 1234567"
              {...register("phoneNumber")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          {/* Email */}
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
              placeholder="ex: ahmed@example.com"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1.5">
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
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-lg sidebar-active-gradient font-sans font-semibold text-base leading-6 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

      </div>
      <p className="text-sm text-gray-600">
        Already have an account? {" "}
        <Link href="/sign-in" className="font-semibold text-blue-500  hover:underline">
        Login
        </Link>
      </p>
    </section>
  );
}
