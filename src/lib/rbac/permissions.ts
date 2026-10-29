import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  job: ["create", "read", "update", "close"],
  candidate: ["create", "read", "update", "delete"],
  application: ["read", "move"], // move = chuyển stage trong pipeline
  scorecard: ["create", "read"], // phiếu đánh giá sau phỏng vấn
  offer: ["create", "read", "approve"],
} as const;

export const ac = createAccessControl(statement);

export const candidateRole = ac.newRole({});

export const adminRole = ac.newRole({
  ...adminAc.statements,
  job: ["create", "read", "update", "close"],
  candidate: ["create", "read", "update", "delete"],
  application: ["read", "move"],
  scorecard: ["create", "read"],
  offer: ["create", "read", "approve"],
});

export const interviewerRole = ac.newRole({
  job: ["read"],
  candidate: ["read"],
  application: ["read"],
  scorecard: ["create", "read"],
});

export const hrRole = ac.newRole({
  job: ["read"],
  candidate: ["read", "update"],
  application: ["read"],
  scorecard: ["read"],
  offer: ["read", "approve"],
});

export const recruiterRole = ac.newRole({
  job: ["create", "read", "update", "close"],
  candidate: ["create", "read", "update"],
  application: ["read", "move"],
  scorecard: ["read"],
  offer: ["read", "read"],
});
