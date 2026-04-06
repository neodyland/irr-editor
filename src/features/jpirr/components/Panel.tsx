import { ReactNode } from "react";

type PanelProps = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function Panel({ title, children, className = "", bodyClassName = "" }: PanelProps) {
  return (
    <section
      className={`mt-4 animate-[lift-in_420ms_ease-out] rounded-2xl border border-slate-300 bg-amber-50/70 p-4 shadow-[0_8px_24px_rgba(23,37,47,0.06)] ${className}`}
    >
      <h2 className="mb-3 text-base font-semibold">{title}</h2>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
