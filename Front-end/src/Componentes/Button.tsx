import React from "react";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  variant?: "default" | "outline";
};

const Button = ({ title, variant = "default", ...props }: ButtonType) => {
  const buttonVariant = () => {
    if (variant === "default") {
      return " cursor-pointer rounded-md bg-teal-200 px-6 py-2 ml-4 text-sm font-bold ";
    } else if (variant == "outline") {
      return " cursor-pointer rounded-md bg-cyan-200 px-15 py-3 text-6 font-bold ";
    }
  };
  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
};
export default Button;
