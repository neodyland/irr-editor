import { FieldError } from "./FieldError";

type WhoisSectionProps = {
  whoisForm: any;
  whoisResult: string;
};

export function WhoisSection({ whoisForm, whoisResult }: WhoisSectionProps) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void whoisForm.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2 md:flex-row">
          <whoisForm.Field name="query">
            {(field: any) => (
              <div className="w-full flex-1">
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-[0.95rem] text-slate-800"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  placeholder="MAINT-AS65000 / AS65000 / 192.0.2.0/24 など"
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </whoisForm.Field>

          <whoisForm.Subscribe selector={(state: any) => state.isSubmitting}>
            {(isSubmitting: boolean) => (
              <button
                type="submit"
                className="cursor-pointer rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-[0.95rem] text-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "実行中..." : "whois 実行"}
              </button>
            )}
          </whoisForm.Subscribe>
        </div>
      </form>

      {whoisResult && (
        <pre className="mt-3 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-300 bg-teal-50/30 p-3 font-mono">
          {whoisResult}
        </pre>
      )}
    </>
  );
}
