interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-[350px] rounded-sm bg-cyan-50 px-2 py-[11px] text-xs text-[#050607]  outline-none" 
    />
  );
};
export default Input;
