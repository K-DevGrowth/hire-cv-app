import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import {
  ac,
  adminRole,
  recruiterRole,
  hrRole,
  interviewerRole,
  candidateRole,
} from "./rbac/permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin: adminRole,
        recruiter: recruiterRole,
        hr: hrRole,
        interviewer: interviewerRole,
        candidate: candidateRole,
      },
      defaultRole: "candidate",
      adminRoles: ["admin"],
    }),
  ],
});
