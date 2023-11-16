import { toast } from "react-hot-toast";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const CustomToast = (header, message, isError, duration = 3000) => {
  return toast(
    (t) => (
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <b className="text-[20px] capitalize font-bold">{header}</b>
          <p className="text-[26px]">{message}</p>
        </div>
        <MdClose size={30} onClick={() => toast.dismiss(t.id)} />
      </div>
    ),
    {
      icon: isError ? (
        <AiFillCloseCircle size={40} color="#B20000" />
      ) : (
        <AiFillCheckCircle size={40} color="#04BB00" />
      ),
      style: {
        borderLeft: isError ? "8px solid #B20000" : "8px solid #04BB00",
      },
      duration: duration,
      animation: true,
    },
  );
};
export default CustomToast;
