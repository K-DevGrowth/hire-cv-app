import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { user, session, account, verification } from "../db/schema/auth-schema";
import { admin } from "better-auth/plugins";
import {
  ac,
  adminRole,
  candidateRole,
  hrRole,
  interviewerRole,
  recruiterRole,
} from "./rbac/permissions";

const schema = { user, session, account, verification };

const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }), {
  schema,
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin({
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
