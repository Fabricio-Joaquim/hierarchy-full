const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1 text-left max-w-md mx-auto text-gray-500 font-semibold">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        className="border-2 border-gray-300 rounded-md p-1"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export { Input };
