import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
<<<<<<< HEAD

if (!process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { config } = require("dotenv");
    config({ path: ".env.local" });
  } catch {
    // Ignore in environments where dotenv is not required
  }
}
=======
>>>>>>> 15e7891 (get all job api)

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
export type Database = typeof db;

export * from "./schema";
