import React, { useState } from "react";

interface InputProps {
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  placeholder,
  type,
  value,
  onChange,
  className,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div
      className={`bg-[#eeeeee] rounded-md border border-[#d8d8d8] flex gap-2 ${className}`}
    >
      <input
        className="p-3 bg-[#eeeeee] outline-none justify-start items-center gap-2 w-full"
        placeholder={placeholder}
        type={inputType}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="pr-2 outline-none"
        >
          {isPasswordVisible ? (
            <img className="h-8" src="../src/assets/icons/visibility-on.svg" alt="Hide" />
          ) : (
            <img className="h-8" src="../src/assets/icons/visibility-off.svg" alt="Show" />
          )}
        </button>
      )}
    </div>
  );
}
