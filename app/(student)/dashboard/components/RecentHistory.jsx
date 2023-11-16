import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

const RecentHistory = ({ name, id, route, data }) => {
  const router = useRouter();
  const handleSeeMoreClick = () => {
    router.push(`/${route}`);
  };

  return (
    <div className="w-full h-[214px] bg-white shadow-outer rounded-[20px] p-4 sm:w-[700px] md:w-[950px] md:h-[256px] md:p-7 xl:w-[425px] 2xl:w-[575px] hover:scale-105 transition duration-300">
      <h1 className={`font-[700] text-[20px] text-main mb-[10px] md:mb-[20px]`}>
        {name}
      </h1>
      <div className="md:mb-[20px]">
        <div className="flex flex-row justify-between">
          <h1 className="font-[600] text-[16px] truncate mr-2 max-w-[400px] ">
            {id}: {data[0] != null ? data[0].id : "No data"}
          </h1>
          <h2 className="font-[600] text-[16px]">
            {data[0] != null
              ? data[0].converted_points || data[0].number_points
              : "No data"}
          </h2>
        </div>
        <div className="flex flex-row justify-between">
          <h1 className="font-[600] text-[14px] text-[#707070]">
            {data[0] != null
              ? new Date(data[0].date).toLocaleDateString()
              : "No data"}
          </h1>
          <h2 className="font-[600] text-[12px] text-[#707070]">Points</h2>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="font-[600] text-[16px] truncate mr-2">
            {id}: {data[1] != null ? data[1].id : "No data"}
          </h1>
          <h2 className="font-[600] text-[16px]">
            {data[1] != null
              ? data[1].converted_points || data[1].number_points
              : "No data"}
          </h2>
        </div>
        <div className="flex flex-row justify-between">
          <h1 className="font-[600] text-[14px] text-[#707070] max-w-[400px]">
            {data[1] != null
              ? new Date(data[1].date).toLocaleDateString()
              : "No data"}
          </h1>
          <h2 className="font-[600] text-[12px] text-[#707070]">Points</h2>
        </div>
      </div>
      <button
        type="submit"
        className="text-center bg-main w-[100px] h-[25px] flex justify-center items-center ml-auto mt-[20px] text-white text-[10px] hover:bg-white hover:text-main transition duration-300 hover:shadow-outer hover:scale-105"
        onClick={handleSeeMoreClick}
      >
        see more
      </button>
    </div>
  );
};

export default RecentHistory;
