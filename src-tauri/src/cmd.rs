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
}
#[derive(Debug, Serialize, Deserialize)]
pub struct FlashConfig {
    app: Vec<App>,
}

lazy_static! {
    static ref CONFIG: Mutex<FlashConfig> = Mutex::new(FlashConfig { app: vec![] });
}

#[tauri::command]
pub fn open_app(_name: String, app_type: String, open_in: String, path: String) -> i8 {
    if app_type == "file" {
        let cmd_str = "start ".to_string() + &path;
        Command::new("cmd")
            .arg("/c")
            .arg(cmd_str)
            .output()
            .expect("cmd exec error!");
    }
    if app_type == "project" {
        let cmd_str = open_in + " " + &path;
        Command::new("cmd")
            .arg("/c")
            .arg(cmd_str)
            .output()
            .expect("cmd exec error!");
    }
    0
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
