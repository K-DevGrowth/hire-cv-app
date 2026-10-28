import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileContent />
    </Suspense>
  );
}

const ProfileContent = async () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) redirect("/login");

  // const { user } = session;

  return (
    <div>
      <h1>Hồ sơ cá nhân</h1>
      <hr />
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>{user.phone && `Phone: ${user.phone}`}</p> */}
    </div>
  );
};
