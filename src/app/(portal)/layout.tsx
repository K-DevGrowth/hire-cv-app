import { Suspense } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { getSession } from "@/lib/auth/guards";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <PortalNavbar />
      </Suspense>
      <main>{children}</main>
    </>
  );
}

async function PortalNavbar() {
  const session = await getSession();
  return <Navbar variant="portal" user={session?.user ?? null} />;
}
