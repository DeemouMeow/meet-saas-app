import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { APP_ROUTES } from "@/lib/routes";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session)
    redirect(APP_ROUTES.login);
  else
    redirect(APP_ROUTES.dashbaord);
}
