export type TlsMode = "starttls" | "tls" | "none";

export type TemplateKind =
  | "route4"
  | "route6"
  | "aut-num"
  | "as-set"
  | "role"
  | "person"
  | "mntner";

export type TemplateDef = {
  label: string;
  body: string;
  whoisSample: string;
};

export type SmtpSettings = {
  smtpHost: string;
  smtpPort: string;
  smtpTlsMode: TlsMode;
  smtpUser: string;
  smtpPass: string;
  mailFrom: string;
  mailTo: string;
  mailSubject: string;
};

export type TlsModeOption = {
  value: TlsMode;
  label: string;
};

export type TemplateChoice = {
  key: TemplateKind;
} & TemplateDef;

export type SendJpirrMailPayload = {
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  smtpTlsMode: TlsMode;
  from: string;
  to: string;
  subject: string;
  body: string;
};
