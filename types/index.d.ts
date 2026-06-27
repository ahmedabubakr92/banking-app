import { z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/validations";

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

