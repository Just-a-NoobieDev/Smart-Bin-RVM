import * as React from "react";
import { useState, useEffect } from "react";
import CustomToast from "@/utils/CustomToast";
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
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdUpdate, MdOutlineError } from "react-icons/md";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";
import { Textarea } from "@/components/ui/textarea";

const UpdateDetails = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [confirm, handleConfirm] = useState(false);
  const [subject, setSubject] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State to store input value
  const [error, setError] = useState(""); // State to manage error message
  const [update, setupdate] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [authUser, setUser] = useState({});
  const user = useAuthStore((state) => state.user);
  const updateMode = () => {
    setupdate(true);
  };

  const addSubject = () => {
    setSubject(true);
  };
  const openConfirm = () => {
    handleConfirm(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const inputChange = (e, field) => {
    setStudentData({ ...studentData, [field]: e.target.value });
  };

  useEffect(() => {
    const getStudentData = async () => {
      if (user != null) {
        const { data: studentData, error } = await supabase
          .from("tbl_admin_user")
          .select("*")
          .eq("admin_id", id)
          .single();

        const { data: authUser } = await supabase.auth.admin.listUsers();

        if (!error) {
          setStudentData(studentData);
          setUser(authUser);
        }
      }
    };

    getStudentData();
  }, [id, user]);

  const saveChanges = async () => {
    try {
      // updateUserCredentials();
      const { error } = await supabase
        .from("tbl_admin_user")
        .update({
          name: studentData.name,
          role_id: 2,
        })
        .eq("admin_id", id);

      if (error) {
        throw error;
      }
      CustomToast("Success!", "Your profile has been updated!", false);
      setModalVisible(false);
    } catch (error) {
      CustomToast("Failed", "Error updating profile:", true);
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <AnimatePresence>
      {modalVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[50] mx-1"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <div className="fixed z-[45] inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="z-[50] p-4 mx-auto max-w-md">
            <Card className=" md:w-[400px]">
              <div className="flex justify-end mr-3 mt-3 mb-[-10px] ">
                <MdClose
                  size={20}
                  className="hover:scale-125 transition duration-300"
                  onClick={closeModal}
                />
              </div>
              <CardHeader>
                <div className="flex justify-between  items-center">
                  <CardTitle className="text-[27px] leading-9 font-semibold text-main">
                    Update Admin Details
                  </CardTitle>
                </div>
                <CardDescription>
                  This shows the details of this Admin&apos;s Account.
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
                        Admin ID
                      </Label>
                      <Textarea
                        id="points"
                        value={studentData.admin_id}
                        className="text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Admin Name
                      </Label>
                      <Input
                        id="studNo"
                        placeholder="2020600716"
                        value={studentData.name}
                        onChange={(e) => inputChange(e, "name")}
                        className="text-[15px] font-medium text-main"
                        disabled={!update}
                      />
                    </div>
                  </div>
                </form>
                <div className="flex justify-end mt-5">
                  <button
                    type="submit"
                    className="flex gap-3 w-[170px] h-[44px] rounded-sm text-[15px] bg-main justify-center items-center text-white"
                    onClick={updateMode}
                  >
                    <MdUpdate size={20} />
                    {update ? (
                      <ConfirmationModal
                        buttonName="Save Details"
                        icon={<BsFillCheckCircleFill />}
                        iconColor="main"
                        cancelButton={true}
                        header="Are you sure?"
                        desc="After confirming, the admin details will be updated."
                        onCancel="Cancel"
                        onConfirm="Confirm"
                        accent="main"
                        onClick={saveChanges}
                      />
                    ) : (
                      "Update Details"
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateDetails;
