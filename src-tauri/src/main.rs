#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use lazy_static::lazy_static;
use std::sync::Mutex;
use tauri::{
    CustomMenuItem, GlobalShortcutManager, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};
struct Status {
    pub is_show: bool,
}

impl Default for Status {
    fn default() -> Status {
        Status { is_show: true }
    }
}

lazy_static! {
    static ref STATUS: Mutex<Status> = Mutex::new(Status::default());
}

#[tauri::command]
fn main_set_hide() {
    STATUS.lock().unwrap().is_show = false;
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(show);

    tauri::Builder::default()
        .setup(|app| {
            let mut short_cut = app.global_shortcut_manager();
            let app_handler = app.handle();
            short_cut
                .register("alt+space", move || {
                    let window = app_handler.get_window("main").unwrap();
                    window.set_focus().unwrap();
                    let b = STATUS.lock().unwrap().is_show;
                    if b {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                    }
                    STATUS.lock().unwrap().is_show = !b;
                })
                .unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![main_set_hide])
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.set_focus().unwrap();
                let b = STATUS.lock().unwrap().is_show;
                if b {
                    window.hide().unwrap();
                } else {
                    window.show().unwrap();
                }
                STATUS.lock().unwrap().is_show = !b;
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                    STATUS.lock().unwrap().is_show = false;
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.set_focus().unwrap();
                    window.show().unwrap();
                    STATUS.lock().unwrap().is_show = true;
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
