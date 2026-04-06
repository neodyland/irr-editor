import { TemplateDef, TemplateKind, TlsModeOption, SmtpSettings, TemplateChoice } from "./types";

export const tlsModeOptions: TlsModeOption[] = [
  { value: "starttls", label: "STARTTLS" },
  { value: "tls", label: "SMTPS (implicit TLS)" },
  { value: "none", label: "TLS なし" },
];

export const defaultSmtpSettings: SmtpSettings = {
  smtpHost: "smtp.example.jp",
  smtpPort: "587",
  smtpTlsMode: "starttls",
  smtpUser: "",
  smtpPass: "",
  mailFrom: "noc@example.jp",
  mailTo: "auto-dbm@nic.ad.jp",
  mailSubject: "IRR Editor Request",
};

export const templateMap: Record<TemplateKind, TemplateDef> = {
  route4: {
    label: "Route (IPv4)",
    whoisSample: "192.0.2.0/24",
    body: `password: YOUR_PASSWORD
route: 192.0.2.0/24
descr: Example Network IPv4 Block
origin: AS65000
notify: netops@example.jp
mnt-by: MAINT-AS65000
changed: netops@example.jp 20260406
source: JPIRR`,
  },
  route6: {
    label: "Route6 (IPv6)",
    whoisSample: "2001:db8::/32",
    body: `password: YOUR_PASSWORD
route6: 2001:db8::/32
descr: Example Network IPv6 Block
origin: AS65000
notify: netops@example.jp
mnt-by: MAINT-AS65000
changed: netops@example.jp 20260406
source: JPIRR`,
  },
  "aut-num": {
    label: "Aut-Num",
    whoisSample: "AS65000",
    body: `password: YOUR_PASSWORD
aut-num: AS65000
as-name: AS-EXAMPLE
descr: Example ASN
notify: netops@example.jp
admin-c: AA000JP
tech-c: BB000JP
mnt-by: MAINT-AS65000
changed: netops@example.jp 20260406
source: JPIRR`,
  },
  "as-set": {
    label: "AS-Set",
    whoisSample: "AS-EXAMPLE",
    body: `password: YOUR_PASSWORD
as-set: AS-EXAMPLE
descr: Example AS set
members: AS65000, AS65001
notify: netops@example.jp
mnt-by: MAINT-AS65000
changed: netops@example.jp 20260406
source: JPIRR`,
  },
  role: {
    label: "Role",
    whoisSample: "Example NOC Team",
    body: `password: YOUR_PASSWORD
role: Example NOC Team
nic-hdl: JP00000000
address: Example Corp.
address: Chiyoda-ku, Tokyo
phone: +81-3-0000-0000
e-mail: noc@example.jp
notify: noc@example.jp
mnt-by: MAINT-AS65000
changed: noc@example.jp 20260406
source: JPIRR`,
  },
  person: {
    label: "Person",
    whoisSample: "Hanako Yamada",
    body: `password: YOUR_PASSWORD
person: Hanako Yamada
nic-hdl: HY000JP
address: Example Corp.
address: Chiyoda-ku, Tokyo
phone: +81-3-0000-0000
e-mail: hanako@example.jp
notify: hanako@example.jp
mnt-by: MAINT-AS65000
changed: hanako@example.jp 20260406
source: JPIRR`,
  },
  mntner: {
    label: "Maintainer",
    whoisSample: "MAINT-AS65000",
    body: `password: YOUR_PASSWORD
mntner: MAINT-AS65000
descr: Example Maintainer
admin-c: AA000JP
tech-c: BB000JP
upd-to: admin@example.jp
mnt-nfy: admin@example.jp
auth: CRYPT-PW YOUR_CRYPT_PASSWORD
mnt-by: MAINT-AS65000
changed: admin@example.jp 20260406
source: JPIRR`,
  },
};

export const templateChoices: TemplateChoice[] = (Object.keys(templateMap) as TemplateKind[]).map(
  (key) => ({ key, ...templateMap[key] }),
);
