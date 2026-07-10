"use client";

import { useEffect, useState } from "react";
import styles from "./LocalTimeTicker.module.css";

function formatTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function LocalTimeTicker() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime());
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className={styles.ticker}>
      <span className={styles.dot} />
      Greater Noida, IN — {time} IST
    </span>
  );
}
