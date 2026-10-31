import { getSession } from "@/lib/auth/guards";

const page = async () => {
  const session = await getSession();

  return (
    <div>
      <div className="bg-blue-200 py-5 px-6">
        <h1>Bạn không chỉ đơn thuần là một bản lý lịch.</h1>
        <p>
          Sơ yếu lý lịch chỉ kể một phần câu chuyện của bạn. Hồ sơ HireTitan
          giúp bạn chia sẻ nhiều hơn với nhà tuyển dụng, và chúng tôi sẽ tiếp
          tục bổ sung thêm các cách thức cá nhân hóa hồ sơ theo thời gian.
        </p>
      </div>

      <div className="m-auto max-w-xl mt-4">
        <h2>{session?.user.name}</h2>
        <p>Tiểu sử</p>
        <p>Hồ sơ CV</p>
        <p>Thông tin liên lạc</p>
        <p>Giáo dục</p>
        <p>Kỹ năng</p>
      </div>
    </div>
  );
};

export default page;
