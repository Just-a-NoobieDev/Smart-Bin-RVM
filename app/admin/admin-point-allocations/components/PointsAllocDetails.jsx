import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import supabase from "@/lib/supabase-browser";

const AllocationDetails = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [data, setData] = useState({});
  // const [confirm, handleConfirm] = useState(false);

  // const [inputValue, setInputValue] = useState(""); // State to store input value
  // const [error, setError] = useState(""); // State to manage error message

  // const openConfirm = () => {
  //   handleConfirm(true);
  // };

  const closeModal = () => {
    setModalVisible(false);
  };

  // const handleInputChange = (event) => {
  //   const value = event.target.value;

  //   if (value !== "1") {
  //     setError("Only 1 point is allowed per subject!");
  //   } else if (value == "1") {
  //     setError(
  //       "Congrats, check the details of the allocation in the Points Allocation History!"
  //     ); //Toast to dapat
  //   } else {
  //     setError("Please add an Input!");
  //   }

  //   setInputValue(value);
  // };

  React.useEffect(() => {
    const get = async () => {
      let { data, error } = await supabase
        .from("tbl_points_allocation")
        .select(`*, tbl_subjects:subject_id (*)`)
        .eq("id", id)
        .single();

      if (!error) {
        setData(data);
      }
    };

    get();
  }, [id]);

  const date = new Date(data.date).toDateString();

  return (
    <AnimatePresence>
      {modalVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[999] mx-1"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <div className="fixed z-[99] inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="z-[999] p-4 mx-auto max-w-md">
            <Card className=" md:w-[400px]">
              <div className="flex justify-end mr-3 mt-3 mb-[-10px] ">
                <MdClose
                  size={20}
                  className="hover:scale-125 transition duration-300"
                  onClick={closeModal}
                />
              </div>
              <CardHeader className="px-6 py-2 md:p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[20px] md:text-[27px] font-semibold text-main">
                    Points Allocation Details
                  </CardTitle>
                </div>
                <CardDescription className="text-[12px] md:text-sm">
                  This shows the details of this Points Allocation Transaction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-1 md:gap-3">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="points"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Transaction ID
                      </Label>
                      <Input
                        id="points"
                        value={data.id}
                        placeholder="0.00"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Student Number
                      </Label>
                      <Input
                        id="studNo"
                        value={data.student_number}
                        placeholder="2020600716"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Number of Points
                      </Label>
                      <Input
                        id="studNo"
                        value={data.number_points}
                        placeholder="2020600716"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Course Code
                      </Label>
                      <Input
                        id="studNo"
                        value={data.tbl_subjects?.subject_code}
                        placeholder="2020600716"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Course Name
                      </Label>
                      <Input
                        id="studNo"
                        value={data.tbl_subjects?.subject_name}
                        placeholder="2020600716"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Course Instructor
                      </Label>
                      <Input
                        id="studNo"
                        value={data.tbl_subjects?.subject_instructor}
                        placeholder="2020600716"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-sm md:text-[15px] font-semibold text-main"
                      >
                        Transaction Date
                      </Label>
                      <Input
                        id="studNo"
                        value={date}
                        placeholder="2020600716"
                        className="h-8 md:h-10 text-[12px] md:text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllocationDetails;
