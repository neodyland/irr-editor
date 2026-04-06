use lettre::message::Mailbox;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(Debug, Deserialize)]
struct SendJpirrMailRequest {
    smtp_host: String,
    smtp_port: u16,
    smtp_username: Option<String>,
    smtp_password: Option<String>,
    smtp_tls_mode: String,
    from: String,
    to: String,
    subject: Option<String>,
    body: String,
}

#[derive(Debug, Deserialize)]
struct WhoisLookupRequest {
    query: String,
}

#[derive(Debug, Serialize)]
struct WhoisLookupResponse {
    stdout: String,
    stderr: String,
    status: i32,
}

#[tauri::command]
fn send_jpirr_mail(request: SendJpirrMailRequest) -> Result<String, String> {
    let from: Mailbox = request
        .from
        .parse()
        .map_err(|e| format!("From アドレスが不正です: {e}"))?;
    let to: Mailbox = request
        .to
        .parse()
        .map_err(|e| format!("To アドレスが不正です: {e}"))?;

    if request.body.trim().is_empty() {
        return Err("本文が空です".to_string());
    }

    let subject = request
        .subject
        .unwrap_or_else(|| "IRR Editor Request".to_string());
    let message = Message::builder()
        .from(from)
        .to(to)
        .subject(subject)
        .body(request.body)
        .map_err(|e| format!("メール本文の作成に失敗しました: {e}"))?;

    let mut builder = match request.smtp_tls_mode.as_str() {
        "tls" => SmtpTransport::relay(&request.smtp_host)
            .map_err(|e| format!("SMTPS 設定エラー: {e}"))?,
        "starttls" => SmtpTransport::starttls_relay(&request.smtp_host)
            .map_err(|e| format!("STARTTLS 設定エラー: {e}"))?,
        "none" => SmtpTransport::builder_dangerous(&request.smtp_host),
        other => {
            return Err(format!(
                "smtp_tls_mode が不正です: {other} (starttls/tls/none を指定してください)"
            ))
        }
    };

    builder = builder.port(request.smtp_port);

    if let (Some(username), Some(password)) = (request.smtp_username, request.smtp_password) {
        if !username.is_empty() {
            builder = builder.credentials(Credentials::new(username, password));
        }
    }

    let transport = builder.build();
    let result = transport
        .send(&message)
        .map_err(|e| format!("SMTP 送信エラー: {e}"))?;
    let response_message = result.message().collect::<Vec<_>>().join(" ");

    Ok(format!("smtp response: {response_message}"))
}

#[tauri::command]
fn whois_lookup(request: WhoisLookupRequest) -> Result<WhoisLookupResponse, String> {
    let query = request.query.trim();
    if query.is_empty() {
        return Err("whois クエリが空です".to_string());
    }

    let output = Command::new("whois")
        .args(["-h", "jpirr.nic.ad.jp", query])
        .output()
        .map_err(|e| {
            if e.kind() == std::io::ErrorKind::NotFound {
                "whois コマンドが見つかりません。OS に whois をインストールしてください。".to_string()
            } else {
                format!("whois 実行エラー: {e}")
            }
        })?;

    Ok(WhoisLookupResponse {
        stdout: String::from_utf8_lossy(&output.stdout).to_string(),
        stderr: String::from_utf8_lossy(&output.stderr).to_string(),
        status: output.status.code().unwrap_or(-1),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![send_jpirr_mail, whois_lookup])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
