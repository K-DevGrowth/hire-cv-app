import { requireStaff } from "@/lib/auth/guards";
import { Navbar } from "@/components/navbar/navbar";
import { Suspense } from "react";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <StaffNavbar />
      </Suspense>
      <main>{children}</main>
    </>
  );
}

async function StaffNavbar() {
  const { user } = await requireStaff();
  return (
    <Navbar
      variant="staff"
      user={{ name: user.name, email: user.email, role: user.role }}
    />
  );
}
