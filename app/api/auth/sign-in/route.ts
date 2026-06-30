import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { signInSchema } from "@/lib/validations";

const DUMMY_HASH =
  "$2b$12$aTwlr/Gvw3CK6ZrIzwP9LOb/M6fGwYblBv3kIzSnhbcrhgmlIJApG";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = signInSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });

  const passwordMatch = await bcrypt.compare(
    password,
    user?.passwordHash ?? DUMMY_HASH,
  );
  if (!user || !passwordMatch) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
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

  return Response.json({ message: "Signed in successfully" }, { status: 200 });
}
