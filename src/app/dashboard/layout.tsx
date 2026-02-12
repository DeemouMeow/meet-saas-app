import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/sidebar/sidebar";
import DashboardNavbar from "@/components/dashboard/navbar/navbar";
import { auth } from "@/lib/auth";
import { APP_ROUTES } from "@/lib/routes";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) 
    redirect(APP_ROUTES.login);

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar/>
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar/>
        {children}
      </main>
    </SidebarProvider>
  );
}