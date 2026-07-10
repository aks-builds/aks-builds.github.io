"use client";

import { useState } from "react";
import cardStyles from "@/app/contact/contact.module.css";

export default function CopyableCard({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cardStyles.card}
      style={{ textAlign: "left", width: "100%", background: "transparent", font: "inherit", cursor: "pointer" }}
    >
      <div className={cardStyles.label}>{label}</div>
      <div className={cardStyles.value}>{copied ? "Copied to clipboard ✓" : value}</div>
    </button>
  );
}
