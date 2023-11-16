"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Hamburger from "@/components/ui/Hamburger";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import Monitoring from "./components/Monitoring";
import History from "./components/AdminHistory";
import supabase from "@/lib/supabase-browser";
import moment, { duration } from "moment/moment";
import CustomToast from "@/utils/CustomToast";
import { ca } from "date-fns/locale";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [btoday, setBtoday] = useState(0);
  const [bweek, setBweek] = useState(0);
  const [bmonth, setBmonth] = useState(0);
  const [january, setJanuary] = useState(0);
  const [february, setFebruary] = useState(0);
  const [march, setMarch] = useState(0);
  const [april, setApril] = useState(0);
  const [may, setMay] = useState(0);
  const [june, setJune] = useState(0);
  const [july, setJuly] = useState(0);
  const [august, setAugust] = useState(0);
  const [september, setSeptember] = useState(0);
  const [october, setOctober] = useState(0);
  const [november, setNovember] = useState(0);
  const [december, setDecember] = useState(0);
  const [transac, setTransac] = useState({});
  const [pointalloc, setPointAlloc] = useState({});
  const [capacity, setCapacity] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);
  let [binColor, setBinColor] = useState(0);
  let [binBackground, setBinBackground] = useState(0);
  const [send, setSend] = useState(false);
  const [sendFull, setSendFull] = useState(false);

  // const fillHeight = capacity * 0.55;

  // const textColor = binColor;
  // const bgColor = binBackground;

  const sendNotification = () => {
    // CustomToast(
    //   "Warning",
    //   "The Bin is almost at Full Capacity",
    //   true,
    //   Infinity,
    // );
  };

  const sendFullNotification = () => {
    CustomToast("Warning", "The Bin is at Full Capacity", true, Infinity);
  };

  const getBinLevel = async () => {
    const { data, error } = await supabase
      .from("capacity")
      .select("value")
      .eq("id", 1)
      .single();

    if (!error) {
      setCapacity(data.value);
      setFillHeight(data.value * 0.55);
    }

    if (data.value <= 20) {
      setBinColor(0);
      setBinBackground(0);
    } else if (data.value <= 40) {
      setBinColor(2);
      setBinBackground(2);
    } else if (data.value <= 60) {
      setBinColor(3);
      setBinBackground(3);
    } else {
      setBinColor(4);
      setBinBackground(4);
      // CustomToast("Warning", "The Bin is almost at Full Capacity", true);
    }
  };

  useEffect(() => {
    const getJanuary = async () => {
      const dateStart = `${moment()
        .month(0)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(0)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setJanuary(total);
    };
    const getFebruary = async () => {
      const dateStart = `${moment()
        .month(1)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(1)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setFebruary(total);
    };
    const getMarch = async () => {
      const dateStart = `${moment()
        .month(2)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(2)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setMarch(total);
    };
    const getApril = async () => {
      const dateStart = `${moment()
        .month(3)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(3)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setApril(total);
    };
    const getMay = async () => {
      const dateStart = `${moment()
        .month(4)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(4)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setMay(total);
    };
    const getJune = async () => {
      const dateStart = `${moment()
        .month(5)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(5)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setJune(total);
    };
    const getJuly = async () => {
      const dateStart = `${moment()
        .month(6)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(6)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setJuly(total);
    };
    const getAugust = async () => {
      const dateStart = `${moment()
        .month(7)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(7)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setAugust(total);
    };
    const getSeptember = async () => {
      const dateStart = `${moment()
        .month(8)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(8)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setSeptember(total);
    };
    const getOctober = async () => {
      const dateStart = `${moment()
        .month(9)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(9)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setOctober(total);
    };
    const getNovember = async () => {
      const dateStart = `${moment()
        .month(10)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(10)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setNovember(total);
    };
    const getDecember = async () => {
      const dateStart = `${moment()
        .month(11)
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .month(11)
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setDecember(total);
    };
    const getBottleToday = async () => {
      const dateStart = `${moment().format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment().format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setBtoday(total);
    };
    const getBottleWeek = async () => {
      const dateStart = `${moment()
        .startOf("week")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment().endOf("week").format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setBweek(total);
    };
    const getBottleMonth = async () => {
      const dateStart = `${moment()
        .startOf("month")
        .format("YYYY-MM-DD")} 00:00:00`;
      const dateEnd = `${moment()
        .endOf("month")
        .format("YYYY-MM-DD")} 23:59:59`;

      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("number_bottles")
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setBmonth(total);
    };

    const getLast2Transaction = async () => {
      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("*")
        .limit(2)
        .order("date", { ascending: false });

      if (!error) {
        setTransac(data);
      }
    };

    const getLast2PointAlloc = async () => {
      const { data, error } = await supabase
        .from("tbl_points_allocation")
        .select("*")
        .limit(2)
        .order("date", { ascending: false });

      if (!error) {
        setPointAlloc(data);
      }
    };

    getBinLevel();
    getBottleToday();
    getBottleWeek();
    getBottleMonth();
    getLast2Transaction();
    getLast2PointAlloc();
    getJanuary();
    getFebruary();
    getMarch();
    getApril();
    getMay();
    getJune();
    getJuly();
    getAugust();
    getSeptember();
    getOctober();
    getNovember();
    getDecember();

    if (send) {
      sendNotification();
    }

    if (sendFull) {
      sendFullNotification();
    }

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_transactions" },
        (payload) => {
          getLast2Transaction();
          getBottleToday();
          getBottleWeek();
          getBottleMonth();
          getJanuary();
          getFebruary();
          getMarch();
          getApril();
          getMay();
          getJune();
          getJuly();
          getAugust();
          getSeptember();
          getOctober();
          getNovember();
          getDecember();
        }
      )
      .subscribe();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_points_allocation" },
        (payload) => {
          getLast2PointAlloc();
        }
      )
      .subscribe();
  }, [send, sendFull]);

  useEffect(() => {
    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "capacity" },
        (payload) => {
          getBinLevel();
          // if (capacity == 100) {
          //   setSendFull(true);
          // } else if (capacity >= 80) {
          //   setSend(true);
          // } else {
          //   setSendFull(false);
          //   setSend(false);
          // }
        }
      )
      .subscribe();
  }, [capacity]);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [
          january,
          february,
          march,
          april,
          may,
          june,
          july,
          august,
          september,
          october,
          november,
          december,
        ], // change this data from backend
        backgroundColor: "#5B801A",
        borderColor: "#5B801A",
        label: "Number of Collected Plastic Bottle per Month",
        fill: true,
        borderWidth: 2,
        lineTension: 0.2,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="max-w-[1440px]">
      <Hamburger />
      <div className="flex flex-wrap flex-row gap-7 m-5 xl:mx-0 justify-center items-center">
        <div className="shadow-outer w-[600px] h-[301px] flex flex-col justify-center sm:flex-row sm:gap-10 items-center p-5 rounded-[20px] sm:w-[570px] md:w-[678px] xl:w-[506px] 2xl:w-[556px] hover:scale-105 transition duration-300">
          <div className="relative">
            <RiDeleteBin6Line
              className={`w-[100px] h-[125px] sm:w-[140px] sm:h-[165px] ${
                binColor == 0
                  ? "text-main"
                  : binColor == 2
                  ? "text-amber-300"
                  : binColor == 3
                  ? "text-amber-600"
                  : "text-error"
              }`}
            />
            <div
              className={`absolute bottom-[20px] left-[20%] w-[60px] sm:bottom-[25px] sm:w-[80px] ${
                binBackground == 0
                  ? "bg-main"
                  : binBackground == 2
                  ? "bg-amber-300"
                  : binBackground == 3
                  ? "bg-amber-600"
                  : "bg-error"
              }`}
              style={{ height: `${fillHeight}%` }}
            ></div>
          </div>
          <div className="flex flex-col mt-[-20px] sm:mt-0">
            <h1
              className={`text-[96px] ${
                binColor == 0
                  ? "text-main"
                  : binColor == 2
                  ? "text-amber-300"
                  : binColor == 3
                  ? "text-amber-600"
                  : "text-error"
              } text-center mb-[-20px] font-semibold`}
            >
              {capacity}%
            </h1>
            <p className="text-[16px] text-[#707070] text-center font-semibold">
              Trash Bin Level
            </p>
          </div>
        </div>
        <Monitoring header="Number of bottles this day" number={btoday} />
        <Monitoring header="Number of bottles this week" number={bweek} />
        <Monitoring header="Number of bottles this month" number={bmonth} />
        <History
          name="Recent Transactions"
          id="Transaction Id"
          route="admin/admin-transactions"
          data={transac}
        />
        <History
          name="Recent Points Allocation"
          id="Allocation Id"
          route="admin/admin-point-allocations"
          data={pointalloc}
        />
        <div className="w-full h-[214px] bg-white shadow-outer rounded-[20px] p-4 flex justify-center items-center  sm:h-[300px] sm:w-[570px] md:w-[678px] md:h-[338px] xl:w-[506px] 2xl:w-[730px] hover:scale-105 transition duration-300">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard, [Roles.admin, Roles.superAdmin]);
