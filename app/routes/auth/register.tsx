import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegister } from "react-hook-form";
import type { z } from "zod";

import { RegisterFormSchema, type RegisterForm } from "~/types/auth/register";
import type { Route } from "./+types/register";
import { Form, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const registerFormData = await request.formData();
  console.log(registerFormData);

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

  const registerResult = await response.json();

  console.dir(registerResult, { depth: null });

  if (!response.ok) {
    return redirect("/register");
  }

  return redirect("/login");
}

export default function Register({ actionData }: Route.ComponentProps) {
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

  const onSubmit = () => {};

  return (
    <div className="mt-14 flex justify-center">
      <div className="w-2xl">
        <h1 className="mb-5 text-center text-4xl">Register</h1>
        <Form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="firstName" className="mb-2">
              First Name
            </Label>
            <Input type="text" id="firstName" {...register("firstName")} />
            <p className="mt-1 text-sm text-red-400">
              {errors.firstName?.message}
            </p>
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-2">
              Last Name
            </Label>
            <Input type="text" id="lastName" {...register("lastName")} />
            <p className="mt-1 text-sm text-red-400">
              {errors.lastName?.message}
            </p>
          </div>

          <div>
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <Input type="text" id="username" {...register("username")} />
            <p className="mt-1 text-sm text-red-400">
              {errors.username?.message}
            </p>
          </div>

          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input type="text" id="email" {...register("email")} />
            <p className="mt-1 text-sm text-red-400">{errors.email?.message}</p>
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input type="password" {...register("password")} />
            <p className="mt-1 text-sm text-red-400">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <Label htmlFor="confirm-password" className="mb-2">
              Confirm Password
            </Label>
            <Input type="password" {...register("confirmPassword")} />
            <p className="mt-1 text-sm text-red-400">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <Button type="submit">Register</Button>
        </Form>
      </div>
    </div>
  );
}
