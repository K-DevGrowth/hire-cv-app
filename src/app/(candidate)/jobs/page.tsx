import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllJobs } from "@/features/jobs/queries";
import { cn } from "cn";
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
      <h1>Việc làm đang tuyển</h1>
      <p className="my-2">0 vị trí phù hợp với bạn</p>
      <form action="" className="my-4">
        <div className="flex items-center gap-4">
          <Input type="text" placeholder="Tìm vị trí hoặc kỹ năng" />
          <Button type="button" className={cn("px-3 py-2")}>
            Tìm việc
          </Button>
        </div>
      </form>
      {/* {jobs.map((job) => (
        <div key={job.id}>
          <p>{job.title}</p>
          <p>{job.summary}</p>
          <Button variant="outline">Ứng tuyển</Button>
        </div>
      ))} */}
    </div>
  );
};
