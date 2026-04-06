import { SmtpSettings } from "./types";
import { defaultSmtpSettings } from "./constants";

const SMTP_SETTINGS_KEY = "jpirr.smtp.settings.v1";

export function loadSmtpSettings(): SmtpSettings {
  try {
    const raw = localStorage.getItem(SMTP_SETTINGS_KEY);
    if (!raw) {
      return defaultSmtpSettings;
    }

    const parsed = JSON.parse(raw) as Partial<SmtpSettings>;
    return {
      smtpHost: parsed.smtpHost ?? defaultSmtpSettings.smtpHost,
      smtpPort: parsed.smtpPort ?? defaultSmtpSettings.smtpPort,
      smtpTlsMode: parsed.smtpTlsMode ?? defaultSmtpSettings.smtpTlsMode,
      smtpUser: parsed.smtpUser ?? defaultSmtpSettings.smtpUser,
      smtpPass: parsed.smtpPass ?? defaultSmtpSettings.smtpPass,
      mailFrom: parsed.mailFrom ?? defaultSmtpSettings.mailFrom,
      mailTo: parsed.mailTo ?? defaultSmtpSettings.mailTo,
      mailSubject: parsed.mailSubject ?? defaultSmtpSettings.mailSubject,
    };
  } catch {
    return defaultSmtpSettings;
  }
}

export function saveSmtpSettings(settings: SmtpSettings) {
  localStorage.setItem(SMTP_SETTINGS_KEY, JSON.stringify(settings));
}
