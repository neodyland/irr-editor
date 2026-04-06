type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
};

export function TextField({ label, value, onChange, type = "text" }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-[0.95rem] text-slate-600">
      {label}
      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-slate-800"
        type={type}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </label>
  );
}
