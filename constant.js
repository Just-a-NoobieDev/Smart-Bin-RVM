import { IoPersonCircleOutline } from "react-icons/io5";
import {
  MdDashboard,
  MdHistory,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";

export const url = {
  login: process.env.NEXT_PUBLIC_DEFAULT_URL + "/login",
  signup: process.env.NEXT_PUBLIC_DEFAULT_URL + "/signup",
  dashboard: process.env.NEXT_PUBLIC_DEFAULT_URL + "/dashboard",
  verify: process.env.NEXT_PUBLIC_DEFAULT_URL + "/verify",
  updatepass: process.env.NEXT_PUBLIC_DEFAULT_URL + "/update-password",
};

export const studentSidebarLinks = [
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/transactions",
    name: "Transaction History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/point-allocations",
    name: "Point Allocation History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/profile",
    name: "Profile",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
];

export const adminSidebarLinks = [
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-transactions",
    name: "Transaction History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-point-allocations",
    name: "Point Allocation History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/student-management",
    name: "Student Management",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/subjects",
    name: "Subject Management",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/reports",
    name: "Reports",
    icon: <TbReport size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-profile",
    name: "Profile",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
];

export const superAdminSidebarLinks = [
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-transactions",
    name: "Transaction History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-point-allocations",
    name: "Point Allocation History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/student-management",
    name: "Student Management",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-management",
    name: "Admin Management",
    icon: <MdOutlineAdminPanelSettings size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/subjects",
    name: "Subjects",
    icon: <TbReport size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/reports",
    name: "Reports",
    icon: <TbReport size={25} color="#fff" />,
  },
  {
    url: process.env.NEXT_PUBLIC_DEFAULT_URL + "/admin/admin-profile",
    name: "Profile",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
];
