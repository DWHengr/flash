use std::{fs::File, process::Command};

use serde::{Deserialize, Serialize};

use lazy_static::lazy_static;
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct App {
    name: String,
    app_type: String,
    open_in: String,
    path: String,
    describe: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct FlashConfig {
    app: Vec<App>,
}

lazy_static! {
    static ref CONFIG: Mutex<FlashConfig> = Mutex::new(FlashConfig { app: vec![] });
}

#[tauri::command]
pub fn open_app(app_type: String, open_in: String, path: String) -> &'static str {
    //verify app_type and path
    if app_type.is_empty() {
        return "app type is empty";
    }
    if path.is_empty() {
        return "path is empty";
    }

    if app_type == "file" {
        let mut open_type = "start";
        if !open_in.is_empty() {
            open_type = &open_in;
        }
        Command::new("cmd")
            .arg("/c")
            .arg(open_type)
            .arg(&path)
            .spawn()
            .expect("cmd exec error!");
    }
    if app_type == "project" {
        if open_in.is_empty() {
            return "open in is empty";
        }
        Command::new("cmd")
            .arg("/c")
            .arg(&open_in)
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
        return FlashConfig { app: vec![] };
    }
    let config: FlashConfig = res.unwrap();
    config
}
