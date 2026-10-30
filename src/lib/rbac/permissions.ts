import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  job: ["create", "read", "update", "delete", "publish"],
  candidate: ["create", "read", "update", "delete"],
  application: ["create", "read", "move-stage", "reject", "withdraw"],
  interview: ["schedule", "read", "cancel"],
  scorecard: ["read", "submit"],
  offer: ["create", "read", "approve", "send"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  job: ["create", "read", "update", "delete", "publish"],
  candidate: ["create", "read", "update", "delete"],
  application: ["create", "read", "move-stage", "reject", "withdraw"],
  interview: ["schedule", "read", "cancel"],
  scorecard: ["read", "submit"],
  offer: ["create", "read", "approve", "send"],
});

export const recruiter = ac.newRole({
  job: ["create", "read", "update", "publish"],
  candidate: ["create", "read", "update"],
  application: ["create", "read", "move-stage", "reject"],
  interview: ["schedule", "read", "cancel"],
  scorecard: ["read"],
  offer: ["create", "read", "send"],
});

export const hiringManager = ac.newRole({
  job: ["read"],
  candidate: ["read"],
  application: ["read", "move-stage"],
  scorecard: ["read", "submit"],
  offer: ["read", "approve"],
});

export const interviewer = ac.newRole({
  candidate: ["read"],
  interview: ["read"],
  scorecard: ["submit"],
});

export const candidate = ac.newRole({
  job: ["read"],
  candidate: ["read", "update"],
  application: ["create", "read", "withdraw"],
});

export const roles = {
  admin,
  recruiter,
  hiring_manager: hiringManager,
  interviewer,
  candidate,
} as const;

export type RoleName = keyof typeof roles;

export const ROLE_NAMES = Object.keys(roles) as RoleName[];

export const STAFF_ROLES = ROLE_NAMES.filter((r) => r !== "candidate");
