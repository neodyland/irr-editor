import { z } from "zod";

export const smtpFormSchema = z.object({
  smtpHost: z.string().min(1, "SMTP ホストは必須です"),
  smtpPort: z
    .string()
    .regex(/^\d+$/, "SMTP ポートは数値で入力してください")
    .refine((value) => {
      const num = Number.parseInt(value, 10);
      return num > 0 && num <= 65535;
    }, "SMTP ポートは 1-65535 の範囲で入力してください"),
  smtpTlsMode: z.enum(["starttls", "tls", "none"]),
  smtpUser: z.string(),
  smtpPass: z.string(),
  mailFrom: z.email("From は有効なメールアドレスを入力してください"),
  mailTo: z.email("To は有効なメールアドレスを入力してください"),
  mailSubject: z.string().min(1, "Subject は必須です"),
  mailBody: z
    .string()
    .min(1, "本文は必須です")
    .refine((value) => value.includes("source: JPIRR"), "本文に source: JPIRR を含めてください"),
});

export const whoisFormSchema = z.object({
  query: z.string().min(1, "whois クエリを入力してください"),
});

export function normalizeError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }

  return "入力エラー";
}
