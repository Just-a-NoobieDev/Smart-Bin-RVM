"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase-browser";
import Hamburger from "@/components/ui/Hamburger";
import Logo from "@/public/images/logo.png";
import CustomToast from "@/utils/CustomToast";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useAuthStore } from "@/store/Auth";
import { motion } from "framer-motion";
import { MdOutlineError } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Profile() {
  const [student, setStudent] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [fetch, setFetch] = useState(false);
  // const [placeholder, setPlaceholder] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const user = useAuthStore((state) => state.user);

  const handleImageUpload = async (e) => {
    if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];

    // Upload the new image to the bucket, Unique folder name for every user to have a better file management
    const { error } = await supabase.storage
      .from("smart_bin_images")
      .upload(`student_users/${user.id}/${file.name}`, file, {
        upsert: true,
      });

    if (error) {
      if (error.message == "mime type not supported") {
        CustomToast(
          "Upload Failed",
          "Invalid file type. Please upload png, jpg and jpeg files only",
          true
        );
      } else if (
        error.message == "The object exceeded the maximum allowed size"
      ) {
        CustomToast(
          "Upload Failed",
          "File size exceeded. Please upload a file below 2mb",
          true
        );
      }
      return;
    }

    // Get the URL of the uploaded image
    const newImageUrl = `https://yzppmncmjybezxhcekir.supabase.co/storage/v1/object/public/smart_bin_images/student_users/${user.id}/${file.name}`;

    // Update the "image_url" column in the user's table
    const { updateError } = await supabase
      .from("tbl_student_users")
      .update({ image_url: newImageUrl })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating user image URL:", updateError);
    } else {
      setImageUrl(newImageUrl);
    }
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const deleteFolderData = async () => {
    const { data: objects, error } = await supabase.storage
      .from("smart_bin_images")
      .list(`${user.id}`, {
        limit: 100,
      });

    if (error) {
      return;
    }

    for (const object of objects) {
      const { error: deleteError } = await supabase.storage
        .from("smart_bin_images")
        .remove([`student_users/${user.id}/${object.name}`]);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { data, error } = await supabase
          .from("tbl_student_users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setStudent(data);
        setNewEmail(user.email);
        setNewPassword(user.password);
      } catch (error) {
        CustomToast("Failed", error, true);
      }
    };

    if (user) {
      fetchStudentData();
    }
  }, [user, fetch]);

  const toggleEditMode = () => {
    setEditMode(true);
  };
  const toggleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleInputChange = (e, field) => {
    setStudent({ ...student, [field]: e.target.value });
    const name = e.target.name;
    const value = e.target.value;

    if (name === "password" || name === "confirmPassword") {
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
      }
    } else if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const updateUserCredentials = async () => {
    if (newEmail === "" && newPassword === "") return;
    if (newEmail === "" && newPassword !== "") {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return;
      }
    }

    if (newEmail !== "" && newPassword === "") {
      const { data, error } = await supabase.auth.admin.updateUserById(
        user.id,
        {
          email: newEmail,
        }
      );
      if (user.email !== newEmail) {
        return;
      }
    }
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
      password: newPassword,
    });

    if (error) {
      CustomToast("Failed", error, true);
      return;
    }
    if (user.email !== newEmail) {
      const { data, error } = await supabase.auth.admin.updateUserById(
        user.id,
        {
          email: newEmail,
        }
      );
      CustomToast(
        "Email Changed",
        "You need to verify both old and new email to confirm your email.",
        false
      );
    } else if (user.email !== newEmail) {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
        password: newPassword,
      });
    }
  };

  // Core update profile function
  const saveChanges = async () => {
    try {
      updateUserCredentials();

      const { error } = await supabase
        .from("tbl_student_users")
        .update([
          {
            id: user.id,
            name: student.name,
            student_number: student.student_number,
            role: 1,
          },
        ])
        .eq("id", user.id)
        .select();

      if (error) {
        throw error;
      }

      setFetch(!fetch);
      toggleCloseEditMode();
      handleImageUpload();
      CustomToast("Success!", "Your profile has been updated!", false);
    } catch (error) {
      CustomToast("Failed", "Error updating profile:", true);
    }
  };

  if (user) {
    return (
      <div className="flex flex-wrap justify-center sm:flex sm:flex-col">
        <Hamburger />
        <div className="flex flex-col justify-center items-center md:flex md:flex-row md:gap-10 md:mx-20 lg:mx-2">
          <div className="relative">
            <img
              src={
                student?.image_url ||
                "https://yzppmncmjybezxhcekir.supabase.co/storage/v1/object/public/smart_bin_images/logo-min.png"
              }
              alt="Uploaded"
              className="rounded-[100%] shadow-outer object-scale-down mt-12 w-[294px] h-[294px]"
            />
            {editMode && ( // Only shows after clicking the edit profile
              <input
                type="file"
                id="file"
                title="You can only upload below 1mb images."
                accept="image/*"
                onClick={deleteFolderData}
                onChange={handleImageUpload}
                className={`absolute left-8 top-44 none `}
              />
            )}
          </div>

          <div className="flex justify-center items-center flex-col mt-5 md:flex md:justify-start md:items-start">
            <h1 className="text-[#5B801A] text-[32px] leading-[55px] text-center font-semibold md:text-[40px] md:text-left 2xl:text-[64px] capitalize lg:max-w-[700px] flex flex-wrap h-full">
              {student?.name}
            </h1>
            <h2 className="text-[18px] font-semibold 2xl:text-[28px] text-[#707070]">
              {student?.student_number}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mt-[40px] md:mt-[70px] 2xl:flex 2xl:gap-4 2xl:mt-[40px] sm:flex sm:flex-col">
          <div className="flex flex-wrap flex-col gap-3 md:flex md:flex-row md:gap-10 lg:gap-3 lg:flex lg:justify-center lg:items-center xl:gap-10 xl:flex xl:flex-row">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-[#5B801A] text-[18px] font-semibold 2xl:text-[24px]"
              >
                Name
              </label>
              <input
                className={`w-[326px] h-[47px] border-[#5B801A] border-[1px] text-[#5B801A] text-[18px] pl-4 md:w-[370px] lg:w-[505px] xl:w-[370px] 2xl:w-[452px] text-opacity-50 ${
                  editMode ? "" : "disabled"
                }`}
                type="text"
                value={student?.name}
                onChange={(e) => handleInputChange(e, "name")}
                disabled={!editMode}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-[#5B801A] text-[18px] font-semibold 2xl:text-[24px]"
              >
                Student number
              </label>
              <input
                type="text"
                value={student?.student_number}
                onChange={(e) => handleInputChange(e, "student_number")}
                className={`w-[326px] h-[47px] border-[#5B801A] border-[1px] text-[#5B801A] text-[18px] lg:w-[505px] xl:w-[300px] pl-4 md:w-[300px] 2xl:w-[366px] text-opacity-50 ${
                  editMode ? "" : "disabled"
                }`}
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor=""
              className="text-[#5B801A] text-[18px] font-semibold 2xl:text-[24px]"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              value={newEmail}
              onChange={(e) =>
                handleInputChange(e, setNewEmail(e.target.value))
              }
              className={`w-[326px] h-[47px] border-[#5B801A] border-[1px] text-[#5B801A] text-[18px] lg:w-[505px] xl:w-[707px] pl-4 md:w-[707px] 2xl:w-[862px] text-opacity-50 ${
                editMode ? "" : "disabled"
              }`}
              disabled={!editMode}
            />
            {emailError && (
              <motion.p
                className="mt-2 flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <MdOutlineError />
                {emailError}
              </motion.p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-[#5B801A] text-[18px] font-semibold 2xl:text-[24px]"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="•••••••"
              // placeholder={placeholder}
              onChange={(e) =>
                handleInputChange(e, setNewPassword(e.target.value))
              }
              className={`w-[326px] h-[47px] border-[#5B801A] border-[1px] text-[#5B801A] text-[18px]  lg:w-[505px] xl:w-[707px]  pl-4 md:w-[707px] 2xl:w-[862px] placeholder:text-main ${
                editMode ? "" : "disabled"
              }`}
              disabled={!editMode}
            />{" "}
            {passwordError && (
              <motion.p
                className="mt-2 flex items-center gap-1 px-2 text-xs font-semibold text-red-500 bg-red-100 rounded-md"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <MdOutlineError />
                {passwordError}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            onClick={toggleEditMode}
            className="w-[326px] h-[47px] bg-[#5B801A] text-white text-[18px] font-semibold mt-[20px] 2xl:w-[528px]"
          >
            {/* {editMode && user.email != newEmail ? (
              <ConfirmationModal
                buttonName="Save Changes"
                icon={<BsFillCheckCircleFill />}
                iconColor="main"
                cancelButton={false}
                header="Your email has been changed!"
                desc="You need to verify both old and new email to confirm your email."
                onConfirm="Okay"
                accent="main"
                onClick={emailChanged}
              />
            ) : editMode ? ( */}
            {editMode ? (
              <ConfirmationModal
                buttonName="Save Changes"
                icon={<BsFillCheckCircleFill />}
                iconColor="main"
                cancelButton={true}
                header="Are you sure?"
                desc="After confirming, your profile will be updated."
                onCancel="Cancel"
                onConfirm="Confirm"
                accent="main"
                onClickCancel={toggleCloseEditMode}
                onClick={() => {
                  if (editMode) {
                    saveChanges();
                  } else {
                    toggleCloseEditMode();
                  }
                }}
              />
            ) : (
              "Edit Profile"
            )}
          </button>
        </div>
      </div>
    );
  }

  // return <Auth />;
}
export default withAuth(Profile, [Roles.student]);
