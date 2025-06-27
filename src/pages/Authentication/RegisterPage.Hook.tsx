import type SignupDTO from "@/apis/DTO/SignupDTO";
import React from "react";
import * as z from "zod/v4";

const RegistrationSchema = z
  .object({
    email: z.email("Invalid email address").min(1, "Email is required").trim(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .trim(),
    confirmPassword: z.string().min(1, "Confirm Password is required").trim(),
    fullname: z
      .string()
      .min(1, "Full name is required")
      .refine(
        (fullname) => {
          const trimmed = fullname.trim();
          return (
            trimmed.length > 0 &&
            !fullname.startsWith(" ") &&
            !fullname.endsWith(" ")
          );
        },
        {
          message: "Full name cannot start/end with spaces or be empty",
        }
      )
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function useRegistration() {
  const [registration, setRegistration] = React.useState<SignupDTO>({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  return {
    ...registration,
    errors,
    updateField: (field: keyof SignupDTO, value: string) => {
      setRegistration((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    validate: () => {
      setErrors({}); // Reset errors before validation
      try {
        return RegistrationSchema.parse(registration) as SignupDTO;
      } catch (errors) {
        if (errors instanceof z.ZodError) {
          for (const error of errors.issues) {
            setErrors((prev) => ({
              ...prev,
              [error.path[0]]: error.message,
            }));
          }
        }
        return null; // Return null if validation fails
      }
    },
  };
}
