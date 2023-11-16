import React from "react";
import { useRouter } from "next/navigation";

const History = ({ name, id, route, data }) => {
  const router = useRouter();
  const handleSeeMoreClick = () => {
    router.push(`/${route}`);
  };

  return (
    <div className="w-full h-[256px] bg-white shadow-outer rounded-[20px] p-4 sm:w-[570px] md:w-[678px] md:h-[256px] md:p-7 xl:w-[506px] 2xl:w-[556px] text-center hover:scale-105 transition duration-300">
      <h1
        className={`font-[700] text-[20px] text-main mb-[10px] md:mb-[20px] text-start`}
      >
        {name}
      </h1>
      <div className="md:mb-[20px]">
        <div className="flex flex-row justify-between">
          <h1 className="font-[600] text-[16px] truncate mr-2 max-w-[400px]">
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
          <h1 className="font-[600] text-[16px] truncate mr-2 max-w-[400px]">
            {id}: {data[1] != null ? data[1].id : "No data"}
          </h1>
          <h2 className="font-[600] text-[16px]">
            {data[1] != null
              ? data[1].converted_points || data[0].number_points
              : "No data"}
          </h2>
        </div>
        <div className="flex flex-row justify-between">
          <h1 className="font-[600] text-[14px] text-[#707070]">
            {data[1] != null
              ? new Date(data[1].date).toLocaleDateString()
              : "No data"}
          </h1>
          <h2 className="font-[600] text-[12px] text-[#707070]">Points</h2>
        </div>
      </div>
      <button
        type="submit"
        className="text-center text-[10px] text-white bg-main w-[100px] h-[25px] flex justify-center items-center ml-auto mt-[20px] hover:bg-white hover:text-main transition duration-300 hover:shadow-outer hover:scale-105"
        onClick={handleSeeMoreClick}
      >
        see more
      </button>
    </div>
  );
};

export default History;
