use std::{fs::File, process::Command, os::windows::process::CommandExt};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct App {
    name: String,
    option_type: String,
    open_in: String,
    path: String,
    describe: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct FlashConfig {
    option: Vec<App>,
}

#[tauri::command]
pub fn open_app(option_type: String, open_in: String, path: String) -> &'static str {
    //verify option_type and path
    if option_type.is_empty() {
        return "app type is empty";
    }
    if path.is_empty() {
        return "path is empty";
    }

    let mut cmd = Command::new("cmd");
    cmd.creation_flags(0x08000000);
    if option_type == "file" {
        let mut open_type = "start";
        if !open_in.is_empty() {
            open_type = &open_in;
        }
        cmd.arg("/c")
            .arg(open_type)
            .arg(&path)
            .spawn()
            .expect("cmd exec error!");
    }
    if option_type == "project" {
        if open_in.is_empty() {
            return "open in is empty";
        }
        cmd.arg("/c")
            .arg(&open_in)
            .arg(&path)
            .spawn()
            .expect("cmd exec error!");
    }
    if option_type == "app" {
        cmd.arg("/c").arg(&path).spawn().expect("cmd exec error!");
    }
    if option_type == "folder" {
        cmd.arg("/c")
            .arg("start")
            .arg(&path)
            .spawn()
            .expect("cmd exec error!");
    }
    if option_type == "link" {
        let mut open_type = "start";
        if !open_in.is_empty() {
            open_type = &open_in;
        }
        cmd.arg("/c")
            .arg(open_type)
            .arg(&path)
            .spawn()
            .expect("cmd exec error!");
    }
    ""
}

#[tauri::command]
pub fn load_config(handle: tauri::AppHandle) -> FlashConfig {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("config/flash.config.json")
        .expect("failed to resolve resource");

    let f = File::open(&resource_path).unwrap();
    let res = serde_json::from_reader(f);
    if let Err(e) = res {
        println!("{}", e.to_string());
        return FlashConfig { option: vec![] };
    }
    let config: FlashConfig = res.unwrap();
    config
}
