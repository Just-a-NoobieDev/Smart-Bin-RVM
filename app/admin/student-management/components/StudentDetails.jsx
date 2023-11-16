"use client";
import * as React from "react";
import { useState, useEffect } from "react";
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
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";

const StudentDetails = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [confirm, handleConfirm] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null); // Add selectedStudent state
  const user = useAuthStore((state) => state.user);

  console.log(id);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const getStudentData = async () => {
      if (user != null) {
        const { data: studentData, error } = await supabase
          .from("tbl_student_users")
          .select("*")
          .eq("id", id)
          .single();

        if (!error) {
          setStudentData(studentData);
        }
      }
    };

    getStudentData();
  }, [user]);

  const date = new Date(studentData.date).toLocaleDateString();

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
                  <CardTitle className="text-[27px] font-semibold text-main">
                    Student Details
                  </CardTitle>
                </div>
                <CardDescription>
                  This shows the details of this Student Account.
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
                        Student Number
                      </Label>
                      <Input
                        id="points"
                        value={studentData.student_number}
                        className="text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Name
                      </Label>
                      <Input
                        id="studNo"
                        value={studentData.name}
                        className="text-[15px] font-medium text-main"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Created At
                      </Label>
                      <Input
                        id="studNo"
                        value={date}
                        placeholder="2020600716"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div>
                    {/* <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Total Points
                      </Label>
                      <Input
                        id="studNo"
                        value={studentData.available_points}
                        placeholder="2020600716"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div> */}
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

export default StudentDetails;
