import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdOutlineError, MdAddCircle } from "react-icons/md";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import CustomToast from "@/utils/CustomToast";
import supabase from "@/lib/supabase-browser";

const AddSubject = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [subjectCode, setSubjectCode] = useState(""); // State for Subject Code
  const [subjectName, setSubjectName] = useState(""); // State for Subject Name
  const [subjectInstructor, setSubjectInstructor] = useState(""); // State for Subject Instructor
  const [error, setNameError] = useState("");
  const [codeerror, setCodeError] = useState("");
  const [teachererror, setTeacherError] = useState("");
  const [inputValue, setInputValue] = useState({
    subject_code: "",
    subject_name: "",
    subject_instructor: "",
  });

  const closeModal = () => {
    setModalVisible(false);
  };

  const addSubject = async () => {
    try {
      const { error } = await supabase.from("tbl_subjects").insert([
        {
          subject_code: subjectCode, // Use the state variables here
          subject_name: subjectName,
          subject_instructor: subjectInstructor,
        },
      ]);
      if (error) {
        setError("Error inserting subject: " + error.message);
        console.log(error.message);
      } else {
        CustomToast("Success", "Subject has been added!", false);
        closeModal();
      }
    } catch (error) {
      setError("Error inserting subject: " + error.message);
      console.log(error.message);
    }
  };

  const handleSubjectCodeChange = (event) => {
    setSubjectCode(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    if (name === "subject_code") {
      const regex = /^[A-Za-z0-9 ]+$/;
      if (!regex.test(value)) {
        setCodeError("Subject code only contains numbers and letters");
      } else {
        setCodeError("");
      }
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubjectNameChange = (event) => {
    setSubjectName(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    if (name === "subject_name") {
      const subjectnameregex = /^[A-Za-z0-9 ]+$/;
      if (!subjectnameregex.test(value)) {
        setNameError("Subject name only contains numbers and letter");
      } else {
        setNameError("");
      }
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubjectInstructorChange = (event) => {
    setSubjectInstructor(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    if (name === "subject_teacher") {
      const teacher_regex = /^[A-Za-z. ]+$/;
      if (!teacher_regex.test(value)) {
        setTeacherError("Teacher name only contains letters and .");
      } else {
        setTeacherError("");
      }
    }
    setInputValue({ ...inputValue, [name]: value });
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
                  <CardTitle className="text-[27px] font-semibold text-main leading-8">
                    Add Subject
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-3">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="points"
                        className="text-[15px] font-semibold text-main"
                      >
                        Subject Code
                      </Label>
                      <Input
                        id="points"
                        name="subject_code"
                        placeholder="Enter subject code"
                        className="text-[15px] font-medium text-main"
                        value={subjectCode}
                        onChange={handleSubjectCodeChange}
                      />
                      {codeerror && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {codeerror}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Subject Name
                      </Label>
                      <Input
                        id="studNo"
                        name="subject_name"
                        placeholder="Enter subject name"
                        className="text-[15px] font-medium text-main"
                        value={subjectName}
                        onChange={handleSubjectNameChange}
                      />
                      {error && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {error}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Subject Teacher
                      </Label>
                      <Input
                        id="studNo"
                        name="subject_teacher"
                        placeholder="Enter teacher name"
                        className="text-[15px] font-medium text-main"
                        value={subjectInstructor}
                        onChange={handleSubjectInstructorChange}
                      />
                      {teachererror && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {teachererror}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </form>
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="flex gap-3 w-[170px] h-[44px] rounded-sm text-[15px] bg-main justify-center items-center text-white"
                  >
                    <MdAddCircle size={20} />

                    <ConfirmationModal
                      buttonName="Add Subject"
                      icon={<BsFillCheckCircleFill />}
                      iconColor="main"
                      cancelButton={true}
                      header="Are you sure?"
                      desc="After confirming, the subject will be added."
                      onCancel="Cancel"
                      onConfirm="Confirm"
                      accent="main"
                      onClick={addSubject}
                    />
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

export default AddSubject;
