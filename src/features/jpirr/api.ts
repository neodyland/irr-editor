import { invoke } from "@tauri-apps/api/core";
import { SendJpirrMailPayload } from "./types";

export async function sendJpirrMail(payload: SendJpirrMailPayload): Promise<string> {
  const smtpPortNumber = Number.parseInt(payload.smtpPort, 10);
  return await invoke<string>("send_jpirr_mail", {
    request: {
      smtp_host: payload.smtpHost,
      smtp_port: smtpPortNumber,
      smtp_username: payload.smtpUsername || null,
      smtp_password: payload.smtpPassword || null,
      smtp_tls_mode: payload.smtpTlsMode,
      from: payload.from,
      to: payload.to,
      subject: payload.subject || null,
      body: payload.body,
    },
  });
}

export async function runWhoisLookup(query: string): Promise<string> {
  const response = await invoke<{ stdout: string; stderr: string; status: number }>("whois_lookup", {
    request: { query },
  });

  const lines = [
    `exit status: ${response.status}`,
    "",
    "----- stdout -----",
    response.stdout || "(no output)",
  ];

  if (response.stderr.trim().length > 0) {
    lines.push("", "----- stderr -----", response.stderr);
  }

  return lines.join("\n");
}
