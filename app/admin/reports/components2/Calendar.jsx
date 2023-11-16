"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function CalendarDemo() {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}
