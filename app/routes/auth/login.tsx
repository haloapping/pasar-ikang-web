import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { data, Form, NavLink, redirect, useSubmit } from "react-router";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { commitSession, getSession } from "~/session.server";
import { LoginFormSchema, type LoginForm } from "~/types/auth/login";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | Pasar Ikang" },
    { name: "description", content: "Fresh seafood anytime, anywhere." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/");
  }

  return data(
    { error: session.get("error") },
    { headers: { "Set-Cookie": await commitSession(session) } },
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const loginFormData = await request.formData();

  const newUser: LoginForm = {
    username: String(loginFormData.get("username")),
    password: String(loginFormData.get("password")),
  };

  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    session.flash("error", "Invalid username/password");
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  const loginResult: { token: string } = await response.json();
  console.info({ loginResult });

  session.set("token", loginResult.token);

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;
  const submit = useSubmit();
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

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    submit(formData, { method: "post" });
  });

  return (
    <div className="mt-14 flex justify-center">
      {error ? <div className="error">{error}</div> : null}
      <div className="w-2xl">
        <h1 className="mb-5 text-center text-4xl">Login</h1>

        <Form
          method="POST"
          onSubmit={onSubmit}
          className="mb-3 flex flex-col gap-4"
        >
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
