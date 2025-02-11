// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use mysql::*;
use mysql::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Task {
    id: i32,
    title: String,
    description: String,
    completed: i8,
}

fn get_connection() -> Pool {
    let url = "mysql://root:1234@localhost:3306/StudyAppToDoList";
    Pool::new(url).unwrap()
}

#[tauri::command]
fn get_tasks() -> Vec<Task> {
    let pool = get_connection();
    let mut conn = pool.get_conn().unwrap();

    let tasks: Vec<Task> = conn
        .query("SELECT id, title, description, completed FROM tasks")
        .unwrap()
        .into_iter()
        .map(|row| {
            let (id, title, description, completed) = mysql::from_row(row);
            Task { id, title, description, completed }
        })
        .collect();

    tasks
}

#[tauri::command]
fn update_task(id: i32, title: String, description: String, completed: i8) -> Result<(), String> {
    let pool = get_connection();
    let mut conn = pool.get_conn().unwrap();
    conn.exec_drop(
        "UPDATE tasks SET title = :title, description = :description, completed = :completed WHERE id = :id",
        params! {
            "id" => id,
            "title" => title,
            "description" => description,
            "completed" => completed,
        },
    ).map_err(|e| e.to_string());
    Ok(())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_tasks, update_task])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
