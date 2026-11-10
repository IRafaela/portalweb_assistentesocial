import React from "react";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  variant?: "default" | "outline";
};

const Button = ({ title, variant = "default", ...props }: ButtonType) => {
  const buttonVariant = () => {
    if (variant === "default") {
      return "w-full border-2 border-cyan-300 cursor-pointer rounded-md bg-teal-200 py-2 text-sm font-bold text-white";
    } else if (variant == "outline") {
      return "w-full  cursor-pointer rounded-md bg-cyan-200 py-2 text-sm font-bold ";
    }
  };
  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
};
export default Button;
