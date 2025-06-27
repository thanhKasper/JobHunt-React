import type SigninDTO from "@/apis/DTO/SigninDTO";
import React from "react";
import { z } from "zod/v4";

const LoginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export function useLogin() {
  const [login, setLogin] = React.useState<SigninDTO>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  return {
    ...login,
    errors,
    updateLogin: (field: keyof SigninDTO, value: string) => {
      setLogin((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    validate: (callback: () => void) => {
      setErrors({});
      const result = LoginSchema.safeParse(login);
      if (!result.success) {
        result.error.issues.forEach(issue => {
          setErrors(prev => ({
            ...prev,
            [issue.path[0]]: issue.message,
          }));
        });
      } else {
        callback();
      }
    },
  };
}
