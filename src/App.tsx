import { useForm } from "@tanstack/react-form";
import { useMemo, useState } from "react";
import { sendJpirrMail, runWhoisLookup } from "./features/jpirr/api";
import { smtpFormSchema, whoisFormSchema } from "./features/jpirr/schemas";
import { loadSmtpSettings, saveSmtpSettings } from "./features/jpirr/storage";
import { SmtpSettings, TemplateKind } from "./features/jpirr/types";
import { Panel } from "./features/jpirr/components/Panel";
import { SmtpMailSection } from "./features/jpirr/components/SmtpMailSection";
import { TemplateSelector } from "./features/jpirr/components/TemplateSelector";
import { WhoisSection } from "./features/jpirr/components/WhoisSection";
import { templateMap } from "./features/jpirr/constants";
import "./App.css";

function App() {
  const [template, setTemplate] = useState<TemplateKind>("route4");

  const [sendResult, setSendResult] = useState("");
  const [whoisResult, setWhoisResult] = useState("");
  const smtpDefault = useMemo(() => loadSmtpSettings(), []);

  const smtpForm = useForm({
    defaultValues: {
      ...smtpDefault,
      mailBody: templateMap.route4.body,
    },
    validators: {
      onSubmit: smtpFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSendResult("");
      try {
        const response = await sendJpirrMail({
          smtpHost: value.smtpHost,
          smtpPort: value.smtpPort,
          smtpUsername: value.smtpUser,
          smtpPassword: value.smtpPass,
          smtpTlsMode: value.smtpTlsMode,
          from: value.mailFrom,
          to: value.mailTo,
          subject: value.mailSubject,
          body: value.mailBody,
        });

        setSendResult(`送信成功: ${response}`);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        setSendResult(`送信失敗: ${msg}`);
      }
    },
  });

  const whoisForm = useForm({
    defaultValues: {
      query: templateMap.route4.whoisSample,
    },
    validators: {
      onSubmit: whoisFormSchema,
    },
    onSubmit: async ({ value }) => {
      setWhoisResult("");
      try {
        setWhoisResult(await runWhoisLookup(value.query));
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        setWhoisResult(`whois 実行失敗: ${msg}`);
      }
    },
  });

  function persistSmtpPatch(patch: Partial<SmtpSettings>) {
    const current = smtpForm.state.values;
    const next: SmtpSettings = {
      smtpHost: patch.smtpHost ?? current.smtpHost,
      smtpPort: patch.smtpPort ?? current.smtpPort,
      smtpTlsMode: patch.smtpTlsMode ?? current.smtpTlsMode,
      smtpUser: patch.smtpUser ?? current.smtpUser,
      smtpPass: patch.smtpPass ?? current.smtpPass,
      mailFrom: patch.mailFrom ?? current.mailFrom,
      mailTo: patch.mailTo ?? current.mailTo,
      mailSubject: patch.mailSubject ?? current.mailSubject,
    };

    saveSmtpSettings(next);
  }

  function applyTemplate(kind: TemplateKind) {
    setTemplate(kind);
    smtpForm.setFieldValue("mailBody", templateMap[kind].body);
    whoisForm.setFieldValue("query", templateMap[kind].whoisSample);
  }

  return (
    <main className="mx-auto max-w-[1260px] px-4 pb-12 pt-10 text-slate-800">
      <header className="animate-[lift-in_380ms_ease-out] py-5">
        <p className="m-0 text-[0.84rem] font-bold uppercase tracking-[0.06em] text-teal-900">
          IRR Editor
        </p>
        <h1 className="mb-2 mt-0 text-[clamp(1.5rem,2.4vw,2.3rem)] leading-tight">
          IRR Editor
        </h1>
        <p className="m-0 max-w-[74ch] text-slate-600">
          JPNIC 公開文書の書式に沿った本文を作成し、SMTP で auto-dbm に送信。
          そのまま whois で反映確認できます。
        </p>
      </header>

      <Panel title="1. テンプレート選択">
        <TemplateSelector template={template} onChange={applyTemplate} />
      </Panel>

      <Panel title="2. SMTP 設定と本文" bodyClassName="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
        <SmtpMailSection
          smtpForm={smtpForm}
          sendResult={sendResult}
          persistSmtpPatch={persistSmtpPatch}
        />
      </Panel>

      <Panel title="4. whois で確認">
        <WhoisSection whoisForm={whoisForm} whoisResult={whoisResult} />
      </Panel>
    </main>
  );
}

export default App;
