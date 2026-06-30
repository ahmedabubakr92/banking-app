import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { encrypt, hashForLookup } from "@/lib/encryption";
import { signUpSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = signUpSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    emiratesId,
    nationality,
    city,
    address,
    dob,
  } = result.data;

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return Response.json({ error: "Email already exists" }, { status: 409 });
  }

  const emiratesIdHash = hashForLookup(emiratesId);
  const existingEmiratesId = await prisma.user.findUnique({
    where: { emiratesIdHash },
  });
  if (existingEmiratesId) {
    return Response.json(
      { error: "Emirates ID already registered" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const encryptedEmiratesId = encrypt(emiratesId);

  let user;
  try {
    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        phoneNumber,
        emiratesId: encryptedEmiratesId,
        emiratesIdHash,
        nationality,
        city,
        address,
        dob: new Date(`${dob}T00:00:00.000Z`),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json(
        { error: "Account with these details already exists" },
        { status: 409 },
      );
    }
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, kycStatus: user.kycStatus },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return Response.json(
    { message: "Account created successfully" },
    { status: 201 },
  );
}
