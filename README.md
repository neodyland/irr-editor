# IRR Editor (Tauri + React)

IRR Editor は、JPNIC の JPIRR をメールベースで操作するためのデスクトップ Web アプリです。

- Rust 側で lettre を使って JPIRR 登録メールを送信
- Rust 側で whois を実行し、jpirr.nic.ad.jp の検索結果を確認
- React 側で Route/Aut-Num/AS-Set/Role/Person/Maintainer のテンプレートを簡単編集

参照した利用方法:
https://www.nic.ad.jp/doc/jpnic-01077.html

## 注意
このコードはOpenAI社のCodexを利用して作られました。

当方で正常に動作するか確認しています。ですが、本アプリを利用する際は自己責任でお願いします。

## 前提

1. Node/Bun 環境
2. Rust/Tauri 環境
3. SMTP サーバーへの接続情報

## 開発起動

```bash
bun install
bun run tauri dev
```

## 利用フロー

1. テンプレートを選択して JPIRR 本文を作成
2. SMTP 設定と送信先（通常 auto-dbm@nic.ad.jp）を入力
3. メール送信ボタンで申請メールを送信
4. whois クエリで反映状況を確認

## 注意

- JPNIC 側仕様変更に備え、最終的なフォーム項目は必ず公式文書で再確認してください。
- メール本文にはフォーム本文のみを記載し、不要な説明文を混在させない運用を想定しています。
