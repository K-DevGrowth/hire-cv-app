import { db } from "@/db";

export const getAllJobs = async () => {
  return await db.query.cong_viec.findMany();
};
