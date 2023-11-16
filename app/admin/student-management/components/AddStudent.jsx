import * as React from "react";
import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineError, MdVisibility, MdVisibilityOff } from "react-icons/md";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { url } from "@/constant";
import supabase from "@/lib/supabase-browser";
import CustomToast from "@/utils/CustomToast";

export function AddStudent({ setter }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [confirm, handleConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    studentNumber: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [studentNumberError, setStudentNumberError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const openConfirm = () => {
    handleConfirm(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setter(false);
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      const regex = /^[A-Za-z. ]+$/;
      if (!regex.test(value)) {
        setNameError("Name can only contain letters and dots");
      } else {
        setNameError("");
      }
    } else if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    } else if (name === "password" || name === "confirmPassword") {
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
      }
      if (name === "confirmPassword" && value !== inputValue.password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    } else if (name === "studentNumber") {
      if (!/^\d+$/.test(value) || value.length > 10) {
        setStudentNumberError("Student number must be up to 10 digits");
      } else {
        setStudentNumberError("");
      }
    }

    setInputValue({ ...inputValue, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirmClick = async () => {
    // Perform validation before signing up and inserting data
    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      !studentNumberError &&
      !confirmPasswordError
    ) {
      try {
        const { error, data: response } = await supabase.auth.signUp({
          email: inputValue.email,
          password: inputValue.password,
          options: {
            emailRedirectTo: url.verify,
          },
        });

        if (error) {
          CustomToast(
            "Failed",
            "There's a problem in your email or password",
            true,
          );
        } else {
          const { data, error } = await supabase
            .from("tbl_student_users")
            .insert({
              id: response.user.id,
              student_number: inputValue.studentNumber,
              name: inputValue.name,
              role: 1,
              pass_length: inputValue.password.length,
            })
            .select();

          if (error) {
            CustomToast("Failed", "The account is not created", true);
          } else {
            const { errors } = await supabase.from("users_role").insert({
              user_id: response.user.id,
              role: 1,
            });

            if (!errors) {
              CustomToast("Success", "The account has been created", false);
              setModalVisible(false);
              setter(false);
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
        CustomToast("Failed", "The account is not created", true);
      }
    }
  };

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
                    Add Student
                  </CardTitle>
                </div>
                <CardDescription>
                  Add the necessary information to add a student.
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
                        name="studentNumber"
                        id="points"
                        placeholder="Enter student number"
                        onChange={handleInputChange}
                        className="text-[15px] font-medium text-main"
                      />
                      {studentNumberError && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {studentNumberError}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-[15px] font-semibold text-main"
                      >
                        Name
                      </Label>
                      <Input
                        name="name"
                        placeholder="Enter full name"
                        className="text-[15px] font-medium text-main"
                        onChange={handleInputChange}
                      />
                      {nameError && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {nameError}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-[15px] font-semibold text-main"
                      >
                        Email
                      </Label>
                      <Input
                        name="email"
                        placeholder="Enter email"
                        className="text-[15px] font-medium text-main"
                        onChange={handleInputChange}
                      />
                      {emailError && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {emailError}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="password"
                        className="text-[15px] font-semibold text-main"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          className="text-[15px] font-medium text-main pr-10"
                          placeholder="Enter password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          onChange={handleInputChange}
                        />
                        <div
                          className="absolute top-3 right-2 cursor-pointer "
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </div>
                      </div>
                      {passwordError && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {passwordError}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-[15px] font-semibold text-main"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          placeholder="Confirm password"
                          className="text-[15px] font-medium text-main pr-10"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          onChange={handleInputChange}
                        />
                        <div
                          className="absolute top-3 right-2 cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </div>
                      </div>
                      {confirmPasswordError && (
                        <motion.p
                          className="flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <MdOutlineError />
                          {confirmPasswordError}
                        </motion.p>
                      )}
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
                  onClick={openConfirm}
                >
                  <ConfirmationModal
                    buttonName="Proceed"
                    icon={<BsFillCheckCircleFill />}
                    iconColor="main"
                    cancelButton={true}
                    header="Are you sure?"
                    desc="After confirming, this student will be added to the database."
                    onCancel="Cancel"
                    onConfirm="Confirm"
                    accent="main"
                    onClickCancel={closeModal}
                    onClick={handleConfirmClick}
                  />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddStudent;
