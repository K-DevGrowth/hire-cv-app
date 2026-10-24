import { getAllJobs } from "@/features/jobs/queries";
import { Suspense } from "react";

export default function JobPage() {
  return (
    <Suspense>
      <JobContent />
    </Suspense>
  );
}

const JobContent = async () => {
  const jobs = await getAllJobs();
  return (
    <div>
      <p className="text-3xl font-bold">Việc làm đang tuyển</p>
      <p>4 vị trí phù hợp với bạn</p>
      <form action="">
        <input type="text" placeholder="Tìm vị trí hoặc kỹ năng" />
        <button type="submit">Tìm việc</button>
      </form>
      {jobs.map((job) => (
        <div key={job.id}>
          <p>{job.title}</p>
          <p>{job.summary}</p>
        </div>
      ))}
    </div>
  );
};
