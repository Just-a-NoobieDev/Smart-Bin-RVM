// components/ConfirmationModal.js
"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ConfirmationModal = ({
  cancelButton,
  buttonName,
  icon,
  desc,
  onCancel,
  onConfirm,
  iconColor,
  header,
  accent,
  onClick,
  onClickCancel,
}) => {
  return (
    <AlertDialog className="z-[999]">
      <AlertDialogTrigger>{buttonName}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`flex items-center gap-4 text-[#1B1B1B] font-bold`}
          >
            <span className={`text-${iconColor}`}>{icon}</span> {header}
          </AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-0 md:gap-2">
          {cancelButton && (
            <AlertDialogCancel
              onClick={onClickCancel}
              className={`bg-white text-[#707070] hover:bg-white transition duration-300 hover:shadow-outer hover:scale-105`}
            >
              {onCancel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={onClick}
            className={`bg-${accent} rounded-sm text-white transition duration-300 hover:shadow-outer hover:scale-105 lg:w-[100px]`}
          >
            {onConfirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
