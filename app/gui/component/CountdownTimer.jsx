import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        router.push("/gui"); // Replace with the path of your target page
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, router]);

  return (
    <div>
      <h1 className="text-main text-center font-[600]">
        Redirecting to Main Page in {seconds} seconds
      </h1>
    </div>
  );
};

export default CountdownTimer;
