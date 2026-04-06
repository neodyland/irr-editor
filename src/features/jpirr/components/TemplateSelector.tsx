import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { templateChoices, templateMap } from "../constants";
import { TemplateKind } from "../types";

type TemplateSelectorProps = {
  template: TemplateKind;
  onChange: (kind: TemplateKind) => void;
};

export function TemplateSelector({ template, onChange }: TemplateSelectorProps) {
  return (
    <Listbox value={template} onChange={onChange}>
      <div className="relative max-w-md">
        <ListboxButton className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-[0.95rem] text-slate-800">
          {templateMap[template].label}
        </ListboxButton>
        <ListboxOptions className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-slate-300 bg-white p-1 shadow-lg">
          {templateChoices.map((item) => (
            <ListboxOption
              key={item.key}
              value={item.key}
              className={({ focus }) =>
                `cursor-pointer rounded-lg px-3 py-2 text-[0.95rem] ${focus ? "bg-emerald-100 text-teal-900" : "text-slate-800"}`
              }
            >
              {item.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
