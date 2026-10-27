import { db, jobs } from "@/db";

export const getAllJobs = async () => {
  return db.select().from(jobs);
};
