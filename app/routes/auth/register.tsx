import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useSubmit } from "react-router";
import type { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RegisterFormSchema, type RegisterForm } from "~/types/auth/register";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const registerFormData = await request.formData();

  const newUser: RegisterForm = {
    firstName: String(registerFormData.get("firstName")),
    lastName: String(registerFormData.get("lastName")),
    username: String(registerFormData.get("username")),
    email: String(registerFormData.get("email")),
    password: String(registerFormData.get("password")),
    confirmPassword: String(registerFormData.get("confirmPassword")),
  };

  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    return redirect("/register");
  }

  return redirect("/login");
}

export default function Register() {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    submit(formData, { method: "post" });
  });

  return (
    <div className="mt-14 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-5 text-center text-4xl">Register</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="firstName" className="mb-2">
              First Name
            </Label>
            <Input type="text" id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-2">
              Last Name
            </Label>
            <Input type="text" id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <Input type="text" id="username" {...register("username")} />
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input type="text" id="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input type="password" id="password" {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="mb-2">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
