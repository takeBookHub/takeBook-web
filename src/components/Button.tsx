import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  design?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  onClick,
  disabled,
  type,
  design = "primary",
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`py-3 font-semibold rounded-md border flex justify-center items-center gap-2.5 disabled:opacity-30 ${className} ${design === "primary" ? "bg-[#c0f4c1] text-[#23771e] shadow-[rgba(145,218,146,1)_0px_4px_0px_0px] border-[#91da92]" : "bg-[#EFEFEF] text-[#757575] shadow-[0px_3px_5px_-2px_#D8D8D8] border-[#D8D8D8]"}`}
    >
      {children}
    </button>
  );
}
