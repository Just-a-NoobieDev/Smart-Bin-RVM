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
    url: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#fff" />,
  },
  {
    url: "/transactions",
    name: "Transaction History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: "/point-allocations",
    name: "Point Allocation History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: "/profile",
    name: "Profile",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
];

export const adminSidebarLinks = [
  {
    url: "/admin",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-transactions",
    name: "Transaction History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-point-allocations",
    name: "Point Allocation History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: "/admin/student-management",
    name: "Student Management",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
  {
    url: "/admin/subjects",
    name: "Subject Management",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
  {
    url: "/admin/reports",
    name: "Reports",
    icon: <TbReport size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-profile",
    name: "Profile",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
];

export const superAdminSidebarLinks = [
  {
    url: "/admin",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-transactions",
    name: "Transaction History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-point-allocations",
    name: "Point Allocation History",
    icon: <MdHistory size={25} color="#fff" />,
  },
  {
    url: "/admin/student-management",
    name: "Student Management",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-management",
    name: "Admin Management",
    icon: <MdOutlineAdminPanelSettings size={25} color="#fff" />,
  },
  {
    url: "/admin/subjects",
    name: "Subjects",
    icon: <TbReport size={25} color="#fff" />,
  },
  {
    url: "/admin/reports",
    name: "Reports",
    icon: <TbReport size={25} color="#fff" />,
  },
  {
    url: "/admin/admin-profile",
    name: "Profile",
    icon: <IoPersonCircleOutline size={25} color="#fff" />,
  },
];
