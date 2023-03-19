use std::{fs::File, io::Write, os::windows::process::CommandExt, process::Command};

use serde::{Deserialize, Serialize};

use regex::Regex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct App {
    name: String,
    option_type: String,
    open_in: String,
    path: String,
    describe: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Setiing {
    shortcut: String,
    search_text: String,
    search_engine: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FlashConfig {
    setting: Setiing,
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
        let re = Regex::new(r"^https?://").unwrap();
        let prefixed_url = if re.is_match(&path) {
            path.to_string()
        } else {
            format!("http://{}", path)
        };
        cmd.arg("/c")
            .arg(open_type)
            .arg(&prefixed_url)
            .spawn()
            .expect("cmd exec error!");
    }
    ""
}

#[tauri::command]
pub fn open_url(url: String, browser: String) -> &'static str {
    let mut cmd = Command::new("cmd");
    cmd.creation_flags(0x08000000);
    let mut open_type = "start";
    if !browser.is_empty() {
        open_type = &browser;
    }
    let re = Regex::new(r"^https?://").unwrap();
    let prefixed_url = if re.is_match(&url) {
        url.to_string()
    } else {
        format!("http://{}", url)
    };
    cmd.arg("/c")
        .arg(open_type)
        .arg(&prefixed_url)
        .spawn()
        .expect("cmd exec error!");
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
        return FlashConfig {
            setting: Setiing {
                shortcut: "".to_string(),
                search_text: "".to_string(),
                search_engine: "".to_string(),
            },
            option: vec![],
        };
    }
    let config: FlashConfig = res.unwrap();
    config
}

#[tauri::command]
pub fn update_config(handle: tauri::AppHandle, config: FlashConfig) -> i32 {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("config/flash.config.json")
        .expect("failed to resolve resource");
    let mut f = File::create(&resource_path).unwrap();
    let json_string = serde_json::to_string_pretty(&config).unwrap();
    let res = f.write(json_string.as_bytes());
    if let Err(e) = res {
        println!("{}", e.to_string());
        return 1;
    }
    0
}
