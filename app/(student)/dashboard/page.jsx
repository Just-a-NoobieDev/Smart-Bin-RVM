"use client";

// import Auth from "@/components/authRoutes";
// import { useAuth } from "@/components/AuthProvider";
import Hamburger from "@/components/ui/Hamburger";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import heroImage from "@/public/images/logo.png";
import Image from "next/image";
import RecentHistory from "./components/RecentHistory";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import UsePointsModal from "./components/UsePointsModal";
import withAuth from "@/utils/withAuth";
import Roles from "@/utils/roles";
import { useAuthStore } from "@/store/Auth";
import supabase from "@/lib/supabase-browser";
import moment from "moment/moment";

const Dashboard = () => {
  const [showClientText, setShowClientText] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");
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

  const handleUsePointsClick = () => {
    setShowClientText(!showClientText);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: points, error } = await supabase
        .from("tbl_student_users")
        .select("available_points, name")
        .eq("id", user.id)
        .single();

      if (!error) {
        setPoints(points.available_points);
        setName(points.name);
      }
    };

    if (user !== null) {
      getData();
    }

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_student_users" },
        (payload) => {
          getData();
        },
      )
      .subscribe();
  }, [user, points]);

  useEffect(() => {
    const getStudentNumber = async () => {
      if (user != null) {
        let { data: studNo, error } = await supabase
          .from("tbl_student_users")
          .select("student_number")
          .eq("id", user.id)
          .single();

        if (!error) {
          return studNo.student_number;
        }
      }

      return null;
    };

    const getJanuary = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setJanuary(total);
    };
    const getFebruary = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setFebruary(total);
    };
    const getMarch = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setMarch(total);
    };
    const getApril = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setApril(total);
    };
    const getMay = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setMay(total);
    };
    const getJune = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setJune(total);
    };
    const getJuly = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setJuly(total);
    };
    const getAugust = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setAugust(total);
    };
    const getSeptember = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setSeptember(total);
    };
    const getOctober = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setOctober(total);
    };
    const getNovember = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setNovember(total);
    };
    const getDecember = async () => {
      const student_number = await getStudentNumber();
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
        .eq("student_number", student_number)
        .gte("date", dateStart)
        .lte("date", dateEnd);

      let total = 0;
      for (let i in data) {
        total += data[i].number_bottles;
      }
      setDecember(total);
    };

    const getLast2Transaction = async () => {
      const student_number = await getStudentNumber();
      const { data, error } = await supabase
        .from("tbl_transactions")
        .select("*")
        .eq("student_number", student_number)
        .limit(2)
        .order("date", { ascending: false });

      if (!error) {
        setTransac(data);
      }
    };

    const getLast2PointAlloc = async () => {
      const student_number = await getStudentNumber();
      const { data, error } = await supabase
        .from("tbl_points_allocation")
        .select("*")
        .eq("student_number", student_number)
        .limit(2)
        .order("date", { ascending: false });

      if (!error) {
        setPointAlloc(data);
      }
    };

    if (user !== null) {
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
    }

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_transactions" },
        (payload) => {
          getLast2Transaction();
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
        },
      )
      .subscribe();

    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tbl_points_allocation" },
        (payload) => {
          getLast2PointAlloc();
        },
      )
      .subscribe();
  }, [user]);

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
        label: "Number of Inserted Plastic Bottle per Month",
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
      <div className="flex flex-wrap flex-row gap-7 m-5  justify-center items-center xl:mx-0">
        <div className="w-[600px] h-[268px] flex flex-col justify-center gap-1 bg-main text-white p-4 rounded-[20px] shadow-outer sm:w-[700px] md:w-[950px] md:h-[309px] md:p-5 xl:w-[520px] 2xl:w-[730px] hover:scale-105 transition duration-300">
          <h1
            className={`font-[700] leading-7 text-[23px] sm:leading-9 mb-[10px] sm:text-[42px] xl:text-[32px] xl:leading-8 lg:leading-[42px]`}
          >
            Hello, {name.charAt(0).toUpperCase() + name.slice(1)}!
          </h1>
          <p className="font-extralight text-[14px] text-justify sm:text-[18px] md:text-[20px] xl:text-[18px] 2xl:text-[20px]">
            <b className="font-bold">Smart Plastic Bottle Bin</b> which is low
            cost and endogenously developed that will aim to encourage recycling
            habits by giving rewards to depositors for every recycled item in
            terms of reward tokens - a creative idea that has been used to aid
            in the collection of recyclable items and, as a result, to increase
            recycling activities.{" "}
          </p>
        </div>

        <div className="w-[600px] sm:w-[700px] sm:mx-0 md:w-[950px] xl:w-[334px] 2xl:w-[420px]">
          <div className=" h-[172px] mb-[20px] bg-white shadow-outer rounded-[20px] text-center p-3 md:h-[219px] hover:scale-105 transition duration-300">
            <h2 className={`font-bold text-[30px] text-main`}>Total Points</h2>
            <h1
              className={`font-bold text-[95px] text-[#707070] mt-[-20px] md:mt-2`}
            >
              {points}
            </h1>
          </div>

          <div
            className=" h-[64px] text-white cursor-pointer bg-main shadow-outer hover:scale-105 rounded-[20px] flex justify-center items-center hover:bg-white hover:text-main transition duration-300"
            onClick={handleUsePointsClick}
          >
            <h1
              className={`font-[600] flex justify-center items-center gap-[10px] text-[24px]`}
            >
              <MdAddCircle className="w-[30px] h-[30px]" /> Use Points
            </h1>
          </div>
          {showClientText && <UsePointsModal />}
        </div>

        <RecentHistory
          name="Recent Transaction"
          id="Transaction Id"
          route="transactions"
          data={transac}
        />
        <RecentHistory
          name="Recent Points Allocation"
          id="Allocation Id"
          route="point-allocations"
          data={pointalloc}
        />

        <div className="w-full h-[214px] bg-white shadow-outer rounded-[20px] p-4 flex justify-center items-center sm:w-[700px] sm:h-[300px] md:w-[950px] md:h-[338px] xl:w-[540px] 2xl:w-[730px] hover:scale-105 transition duration-300">
          <Line data={data} />
        </div>
        <Image
          src={heroImage}
          width={257}
          height={221}
          alt="heroImage"
          className="mr-[30px] ml-[30px] 2xl:w-[357px] 2xl:h-[321px] hover:scale-105 transition duration-300"
        />
      </div>
    </div>
  );
};

export default withAuth(Dashboard, [Roles.student]);
