use std::process::Command;

#[tauri::command]
pub fn open_app(content: &str) -> i8{
  if content == "host" {
    let cmd_str = "start C:\\Windows\\System32\\drivers\\etc\\hosts".to_string();
    Command::new("cmd").arg("/c").arg(cmd_str).output().expect("cmd exec error!");
  }
  0
}