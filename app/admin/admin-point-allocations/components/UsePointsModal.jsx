"use client";
import { useEffect, useState } from "react";
import { BiSolidHelpCircle } from "react-icons/bi";
import { Button } from "@/components/ui/Buttons";
import { BsFillCheckCircleFill } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { ComboboxDemo } from "./Combobox";
import ConfirmAllocation from "./ConfirmAllocation";
import CustomToast from "@/utils/CustomToast";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";
import moment from "moment";
import { useRouter } from "next/navigation";

const UsePointsModal = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [confirm, handleConfirm] = useState(false);
  // const [subject, setSubject] = useState(false);
  const [inputValue, setInputValue] = useState("0"); // State to store input value
  // const [error, setError] = useState(""); // State to manage error message
  // const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [download, setDownload] = useState(false);
  const [userD, setUserD] = useState({});
  const [pointD, setPointD] = useState({});
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // const addSubject = () => {
  //   setSubject(true);
  // };
  const openConfirm = () => {
    handleConfirm(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    router.refresh();
  };
  const isDownload = () => {
    //check if the points is greater than 0 and subject is selected
    let pValue = parseFloat(inputValue);
    if (value == "") {
      CustomToast("Error", "Please select a subject first!", true);
    } else if (pValue <= 0) {
      CustomToast("Error", "Please enter a value greater than 0!", true);
    } else if (pValue > 1) {
      CustomToast("Error", "Value must not exceed to 1!", true);
    } else {
      const getUsedPointsPerSubject = async () => {
        const dateStart = `${moment()
          .startOf("month")
          .format("YYYY-MM-DD")} 00:00:00`;
        const dateEnd = `${moment()
          .endOf("month")
          .format("YYYY-MM-DD")} 23:59:59`;

        const { data, error } = await supabase
          .from("tbl_points_allocation")
          .select("number_points")
          .eq("subject_id", value)
          .gte("date", dateStart)
          .lte("date", dateEnd);

        if (!error) {
          let total = 0;
          data.map((item) => {
            total += item.number_points;
          });
          return total;
        }
      };
      // update the available points of the user
      const updatePoints = async () => {
        const used = await getUsedPointsPerSubject();
        const available = 1 - used;

        if (available < 0) {
          CustomToast("Sorry", "Insufficient Points", true);
          return;
        }

        if (used + pValue > 1) {
          CustomToast(
            "Sorry",
            `We cannot proceed your request. The available points that you can use to this subject this month is ${(
              Math.floor(available * 100) / 100
            ).toFixed(2)}`,
            true,
          );
          return;
        }

        const { data, error } = await supabase
          .from("tbl_student_users")
          .update({
            available_points: userD.available_points - pValue,
          })
          .eq("id", id)
          .select();

        if (error) {
          CustomToast("Error", error.message, true);
        } else {
          const { data, error } = await supabase
            .from("tbl_points_allocation")
            .insert([
              {
                student_number: userD.student_number,
                subject_id: value,
                number_points: pValue,
              },
            ])
            .select();

          if (!error) {
            setDownload(true);
            setPointD(data[0]);
          }
        }
      };
      if (user != null) {
        updatePoints();
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("tbl_student_users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {
        setUserD(data);
      }
    };

    if (user != null) {
      getData();
    }
  }, [user]);

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
  return (
    <AnimatePresence>
      {modalVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 mx-1"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="z-10 p-4 mx-auto max-w-md">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center relative">
                  <CardTitle className="text-[27px] font-semibold text-main">
                    Points Allocation
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BiSolidHelpCircle className="text-[#707070] absolute top-0 right-0" />
                      </TooltipTrigger>
                      <TooltipContent className="p-6 bg-white shadow-outer ">
                        <h1 className="text-[17px] font-semibold text-main">
                          How to use your points:
                        </h1>
                        <ol className="list-decimal ml-5 max-w-[200px] text-justify mt-3 text-[#707070] flex gap-2 flex-col">
                          <li>Check if you have points.</li>
                          <li>
                            Select the subject you want those points to be used.
                          </li>
                          <li>
                            Enter the number of points you want to use.{" "}
                            <span className="text-error">
                              Remember maximum of 1 point per subject only.
                            </span>
                          </li>
                        </ol>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  Use your points for the subject that you want.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-3">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="points"
                        className="text-[15px] font-semibold text-main"
                      >
                        Available Points
                      </Label>
                      <Input
                        id="points"
                        placeholder="0.00"
                        value={userD.available_points}
                        className="text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Student Number
                      </Label>
                      <Input
                        id="studNo"
                        placeholder="2020600716"
                        value={userD.student_number}
                        className="text-[15px] font-medium text-main"

                        // disabled={!isAdmin}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="framework"
                        className="text-[15px] font-semibold text-main"
                      >
                        Subjects
                      </Label>
                      <ComboboxDemo
                        className="w-full"
                        value={value}
                        setValue={setValue}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Enter Points
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        placeholder="0"
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-[15px] font-medium text-main"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-5 ">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-white text-gray hover:shadow-outer hover:scale-105 transition duration-300"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-main text-white rounded-sm w-[90px] hover:bg-white hover:text-main hover:shadow-outer hover:scale-105 transition duration-300"
                  // onChange={handleInputChange}
                  onClick={openConfirm}
                >
                  <ConfirmationModal
                    buttonName="Proceed"
                    icon={<BsFillCheckCircleFill />}
                    iconColor="main"
                    cancelButton={true}
                    header="Are you sure?"
                    desc="After confirming, you will not be able to change the details of this transaction."
                    onCancel="Cancel"
                    onConfirm="Confirm"
                    accent="main"
                    onClick={isDownload}
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
          {download && <ConfirmAllocation onClose={closeModal} data={pointD} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UsePointsModal;
