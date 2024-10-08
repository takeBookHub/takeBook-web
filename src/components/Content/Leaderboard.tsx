export default function Leaderboard() {
  const User = () => {
    return (
      <div className="flex justify-between items-center bg-white rounded-full pr-4">
        <div className="flex items-center gap-2">
          <img className="bg-black h-12 w-12 rounded-full" src="" alt="" />
          <div className="flex flex-col">
            <span className="font-semibold w-36 overflow-hidden text-ellipsis">martinetbn</span>
            <span className="text-[14px]">Page 0</span>
          </div>
        </div>
        <span className="font-semibold">ch.1</span>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-4 pt-12 px-2">
      <div className="bg-[#E6CBAD] h-[70vh] lg:h-fit max-h-[570px] p-4 pt-6 rounded-[40px]">
        <div className="bg-[#EFEFEF] h-full px-6 lg:p-8 py-8 rounded-[32px] relative flex flex-col gap-6">
          <img
            className="absolute h-[72px] top-[-60px] left-[50%] transform -translate-x-1/2"
            src="/images/clip-holder.svg"
            alt="Paper Clip"
          />
          <span className="font-['Crimson_Text'] font-semibold text-3xl text-center">
            Best students of the week
          </span>
          <div className="flex flex-col gap-2 overflow-scroll rounded-xl">
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
          </div>
        </div>
      </div>
    </div>
  );
}
