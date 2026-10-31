import { cache } from "react";
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { STAFF_ROLES, type Permissions } from "./permissions";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export const requireSession = async () => {
  const session = await getSession();
  if (!session) redirect("/signin");
  return session;
};

export const can = async (permissions: Permissions) => {
  const session = await getSession();
  if (!session) return false;

  const { success } = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions,
    },
  });
  return success;
};

export const requirePermission = async (permissions: Permissions) => {
  const session = await requireSession();
  if (!(await can(permissions))) redirect("/forbidden");
  return session;
};

export const requireStaff = async () => {
  const session = await requireSession();

  const userRoles = (session.user.role ?? "").split(",");

  const isStaff = userRoles.some((role) =>
    (STAFF_ROLES as string[]).includes(role),
  );

  if (!isStaff) redirect("/applications");

  return session;
};
