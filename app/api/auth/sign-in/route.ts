import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { signInSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = signInSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, kycStatus: user.kycStatus },
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

  return Response.json({ message: "Signed in successfully" }, { status: 200 });
}
