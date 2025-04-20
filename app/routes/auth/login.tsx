import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { LoginFormSchema } from "~/types/auth/login";
import type { Route } from "./+types/register";
import { Form, NavLink } from "react-router";
import { Label } from "~/components/ui/label";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="mt-14 flex justify-center">
      <div className="w-2xl">
        <h1 className="mb-5 text-4xl">Login</h1>

        <Form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="mb-3 flex flex-col gap-4"
        >
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
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input type="text" id="password" {...register("password")} />
            <p className="mt-1 text-sm text-red-400">
              {errors.password?.message}
            </p>
          </div>

          <Button type="submit">Login</Button>
        </Form>
        <p className="text-center">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="underline underline-offset-2">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
