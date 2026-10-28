import { Suspense } from "react";

export default function ApplicationPage() {
  return (
    <Suspense fallback={<p>Đang tải hồ sơ ứng tuyển...</p>}>
      <ApplicationContent />
    </Suspense>
  );
}

const ApplicationContent = async () => {
  return (
    <div>
      <h1>Hồ sơ đã ứng tuyển</h1>
      <p>0 hồ sơ</p>
    </div>
  );
};
