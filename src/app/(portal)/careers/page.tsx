import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const page = () => {
  return (
    <div>
      <div className="bg-blue-100 py-10">
        <form
          action=""
          className="flex gap-4 justify-center items-center m-auto max-w-lg"
        >
          <Input
            className="bg-white rounded"
            placeholder="Full stack developer"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white">
            Tìm kiếm
          </Button>
        </form>
      </div>
      <div className="p-6">
        <h1>Việc làm dành cho bạn</h1>
        <p>Từ các công ty tuyển dụng qua HireTitan.</p>
      </div>
    </div>
  );
};

export default page;
