import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { tlsModeOptions } from "../constants";
import { SmtpSettings, TlsMode } from "../types";
import { FieldError } from "./FieldError";
import { TextField } from "./TextField";

type SmtpMailSectionProps = {
  smtpForm: any;
  sendResult: string;
  persistSmtpPatch: (patch: Partial<SmtpSettings>) => void;
};

export function SmtpMailSection({ smtpForm, sendResult, persistSmtpPatch }: SmtpMailSectionProps) {
  return (
    <form
      className="contents"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void smtpForm.handleSubmit();
      }}
    >
      <div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <smtpForm.Field name="smtpHost">
            {(field: any) => (
              <div>
                <TextField
                  label="SMTP ホスト"
                  value={field.state.value}
                  onChange={(value) => {
                    field.handleChange(value);
                    persistSmtpPatch({ smtpHost: value });
                  }}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </smtpForm.Field>

          <smtpForm.Field name="smtpPort">
            {(field: any) => (
              <div>
                <TextField
                  label="SMTP ポート"
                  value={field.state.value}
                  onChange={(value) => {
                    field.handleChange(value);
                    persistSmtpPatch({ smtpPort: value });
                  }}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </smtpForm.Field>

          <smtpForm.Field name="smtpTlsMode">
            {(field: any) => (
              <div className="flex flex-col gap-1 text-[0.95rem] text-slate-600">
                TLS モード
                <Listbox
                  value={field.state.value}
                  onChange={(value: TlsMode) => {
                    field.handleChange(value);
                    persistSmtpPatch({ smtpTlsMode: value });
                  }}
                >
                  <div className="relative">
                    <ListboxButton className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-[0.95rem] text-slate-800">
                      {tlsModeOptions.find((item) => item.value === field.state.value)?.label}
                    </ListboxButton>
                    <ListboxOptions className="absolute z-20 mt-2 w-full rounded-xl border border-slate-300 bg-white p-1 shadow-lg">
                      {tlsModeOptions.map((item) => (
                        <ListboxOption
                          key={item.value}
                          value={item.value}
                          className={({ focus }) =>
                            `cursor-pointer rounded-lg px-3 py-2 ${focus ? "bg-emerald-100 text-teal-900" : "text-slate-800"}`
                          }
                        >
                          {item.label}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </smtpForm.Field>

          <smtpForm.Field name="smtpUser">
            {(field: any) => (
              <TextField
                label="SMTP ユーザー名 (任意)"
                value={field.state.value}
                onChange={(value) => {
                  field.handleChange(value);
                  persistSmtpPatch({ smtpUser: value });
                }}
              />
            )}
          </smtpForm.Field>

          <smtpForm.Field name="smtpPass">
            {(field: any) => (
              <TextField
                label="SMTP パスワード (任意)"
                type="password"
                value={field.state.value}
                onChange={(value) => {
                  field.handleChange(value);
                  persistSmtpPatch({ smtpPass: value });
                }}
              />
            )}
          </smtpForm.Field>

          <smtpForm.Field name="mailFrom">
            {(field: any) => (
              <div>
                <TextField
                  label="From"
                  value={field.state.value}
                  onChange={(value) => {
                    field.handleChange(value);
                    persistSmtpPatch({ mailFrom: value });
                  }}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </smtpForm.Field>

          <smtpForm.Field name="mailTo">
            {(field: any) => (
              <div>
                <TextField
                  label="To"
                  value={field.state.value}
                  onChange={(value) => {
                    field.handleChange(value);
                    persistSmtpPatch({ mailTo: value });
                  }}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </smtpForm.Field>

          <smtpForm.Field name="mailSubject">
            {(field: any) => (
              <div>
                <TextField
                  label="Subject"
                  value={field.state.value}
                  onChange={(value) => {
                    field.handleChange(value);
                    persistSmtpPatch({ mailSubject: value });
                  }}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </smtpForm.Field>
        </div>

        <p className="mt-2 text-xs text-slate-500">SMTP 設定は自動保存され、次回起動時に復元されます。</p>
      </div>

      <div>
        <h3 className="mb-3 text-base font-semibold">3. JPIRR 本文</h3>
        <p className="mb-2 text-sm text-slate-600">
          本文以外の説明文は入れず、フォーム本文のみ送る運用です。削除時は delete 行を追加してください。
        </p>

        <smtpForm.Field name="mailBody">
          {(field: any) => (
            <>
              <textarea
                className="min-h-[360px] w-full rounded-xl border border-slate-300 bg-white px-2.5 py-2 font-mono leading-snug text-slate-800"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.currentTarget.value)}
              />
              <FieldError errors={field.state.meta.errors} />
            </>
          )}
        </smtpForm.Field>

        <div className="mt-3 flex justify-end">
          <smtpForm.Subscribe selector={(state: any) => state.isSubmitting}>
            {(isSubmitting: boolean) => (
              <button
                type="submit"
                className="cursor-pointer rounded-xl border border-teal-700 bg-teal-700 px-4 py-2 text-[0.95rem] text-white hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "送信中..." : "JPIRR へメール送信"}
              </button>
            )}
          </smtpForm.Subscribe>
        </div>

        {sendResult && (
          <pre className="mt-3 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-300 bg-emerald-50 p-3 font-mono">
            {sendResult}
          </pre>
        )}
      </div>
    </form>
  );
}
