import { auth } from "@/lib/auth";
import { UserRole } from "@/lib/navigation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   redirect("/login");
  // }

  // const userRole = (session.user.role?.toLowerCase() ??
  //   "candidate") as UserRole;

  return (
    <div className="flex flex-1">
      {/* Nội dung chính của trang */}
      <main className="flex-1 p-6 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
