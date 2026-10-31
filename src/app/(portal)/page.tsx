import { getSession } from "@/lib/auth/guards";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense>
      <HomePageContent />
    </Suspense>
  );
}

async function HomePageContent() {
  const session = await getSession();

  if (session?.user) {
    const roles = (session.user.role ?? "").split(",");

    // Nếu là interviewer -> vào lịch phỏng vấn
    if (roles.includes("interviewer")) {
      redirect("/interviews");
    }
    // Nếu là admin, recruiter, hiring_manager -> vào dashboard
    if (
      roles.some((r) => ["admin", "recruiter", "hiring_manager"].includes(r))
    ) {
      redirect("/dashboard");
    }
    // Nếu là candidate -> vào đơn ứng tuyển hoặc trang việc làm
    if (roles.includes("candidate")) {
      redirect("/applications");
    }
  }

  return <div>Trang chủ cho khách vãng lai</div>;
}
