#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{
    App, AppHandle, CustomMenuItem, GlobalShortcutManager, GlobalWindowEvent, Manager, RunEvent,
    SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, Wry,
};

fn main() {
    let app = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .system_tray(SystemTray::new().with_menu(tray_menu()))
        .on_system_tray_event(system_tray_event)
        .on_window_event(window_event)
        .build(tauri::generate_context!())
        .expect("error while running tauri application");
    register_shortcut(&app);
    app.run(handle_run_events);
}

fn window_event(e: GlobalWindowEvent) {
    match e.event() {
        tauri::WindowEvent::Focused(focused) => {
            if !focused {
                e.window().hide().unwrap();
            }
        }
        _ => {}
    }
}

fn handle_run_events(_app_handle: &AppHandle<Wry>, e: RunEvent) {
    match e {
        RunEvent::Exit => {}
        RunEvent::ExitRequested { .. } => {}
        RunEvent::WindowEvent {
            label: _, event: _, ..
        } => {}
        RunEvent::Ready => {}
        RunEvent::Resumed => {}
        RunEvent::MainEventsCleared => {}
        _ => {}
    }
}

// register shortcut
fn register_shortcut(app: &App<Wry>) {
    let mut short_cut = app.global_shortcut_manager();
    let app_handler = app.handle();
    let result = short_cut.register("alt+space", move || {
        let window = app_handler.get_window("main").unwrap();
        if window.is_visible().unwrap() {
            window.hide().unwrap();
        } else {
            window.show().unwrap();
            window.set_focus().unwrap();
        }
    });
    if let Err(err) = result {
        println!("{}", err);
    }
}

// tray menu
fn tray_menu() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    tray_menu
}

// system tray event fn
fn system_tray_event(app: &AppHandle<Wry>, e: SystemTrayEvent) {
    match e {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            let window = app.get_window("main").unwrap();
            if !window.is_visible().unwrap() {
                window.show().unwrap();
                window.set_focus().unwrap();
            }
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            "show" => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
