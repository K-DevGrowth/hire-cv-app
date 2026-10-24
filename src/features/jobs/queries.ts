import { db } from "@/db";

export const getAllJobs = async () => {
  return await db.query.jobs.findMany();
};
