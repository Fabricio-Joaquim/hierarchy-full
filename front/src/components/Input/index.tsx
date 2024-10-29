import { InputHTMLAttributes } from "react";
/* 
JSX.IntrinsicElements.input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

*/

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  change: (value: string) => void;
}

const Input = ({ label, value, change, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 text-left max-w-md text-gray-500 font-semibold">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        className="border-2 border-gray-300 rounded-md p-1"
        type="text"
        value={value}
        onChange={(e) => change(e.target.value)}
        {...rest}
      />
    </div>
  );
};

export { Input };
