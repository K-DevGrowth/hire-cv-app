import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllJobs } from "@/db/queries/select";
import { cn } from "cn";
import { ChevronRight } from "lucide-react";
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
      <p className="my-2">{jobs.length} vị trí phù hợp với bạn</p>
      <form action="" className="my-4">
        <div className="flex items-center gap-4">
          <Input type="text" placeholder="Tìm vị trí hoặc kỹ năng" />
          <Button type="button" className={cn("px-3 py-2")}>
            Tìm việc
          </Button>
        </div>
      </form>
      {jobs.map((job) => (
        <div key={job.id} className="my-4">
          <Card
            className={cn("flex flex-row justify-between p-4 items-center")}
          >
            <div className="*:py-2">
              <h3>{job.title}</h3>
              <p>{job.summary}</p>
              <Badge variant="neon">{job.department}</Badge>
              <p>
                {job.experience} | {job.salary} | {job.location}
              </p>
            </div>
            <Button variant="outline">
              Ứng tuyển <ChevronRight />
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};
