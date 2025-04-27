import { CalendarIcon, Mail, User } from "lucide-react";
import { redirect } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { destroySession, getSession } from "~/session.server";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");

  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    session.flash("error", "Failed to check user");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const userData = await response.json();

  return userData;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const user = loaderData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={user.avatarUrl || ""}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-2xl">
            {user.firstName} {user.lastName}
          </CardTitle>
          <div className="text-muted-foreground flex items-center text-sm">
            <User className="mr-1 h-4 w-4" />@{user.username}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Mail className="text-muted-foreground h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <span>Member since {formatDate(user.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
