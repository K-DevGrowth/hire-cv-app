const Jobs = async () => {
  return (
    <div>
      <p className="text-3xl font-bold">Việc làm đang tuyển</p>
      <p>4 vị trí phù hợp với bạn</p>
      <form action="">
        <input type="text" placeholder="Tìm vị trí hoặc kỹ năng" />
        <button type="submit">Tìm việc</button>
      </form>
      <div>get jobs</div>
    </div>
  );
};

export default Jobs;
