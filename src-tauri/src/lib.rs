use mysql::*;
use mysql::prelude::*;
use model::models::{Task, Category};
pub mod model;
fn get_connection() -> Result<Pool, String> {
    let url = "mysql://root:1234@localhost:3306/StudyAppToDoList";
    Pool::new(url).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_tasks() -> Result<Vec<Task>, String> {
    let pool = get_connection()?;
    let mut conn = pool.get_conn().map_err(|e| e.to_string())?;

    let result: Result<Vec<Task>, String> = conn
        .query::<(i32, String, String, i8, String), _>(
            "SELECT id, title, description, completed, category FROM tasks"
        )
        .map_err(|e| e.to_string())?
        .into_iter()
        .map(|(id, title, description, completed, category_str)| {
            let category = Category::from_str(&category_str)
                .ok_or_else(|| format!("Unknown category: {}", category_str))?;
            Ok(Task {
                id,
                title,
                description,
                completed,
                category,
            })
        })
        .collect();

    result
}

#[tauri::command]
fn create_task(title: String, description: String, completed: i8, category: Category) -> Result<(), String> {
    let pool = get_connection()?;
    let mut conn = pool.get_conn().map_err(|e| e.to_string())?;
    conn.exec_drop(
        "INSERT INTO tasks (title, description, completed, category) VALUES (:title, :description, :completed, :category)",
        params! {
            "title" => title,
            "description" => description,
            "completed" => completed,
            "category" => category.as_str(),
        },
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn update_task(id: i32, title: String, description: String, completed: i8, category: Category) -> Result<(), String> {
    let pool = get_connection()?;
    let mut conn = pool.get_conn().map_err(|e| e.to_string())?;
    conn.exec_drop(
        "UPDATE tasks SET title = :title, description = :description, completed = :completed, category = :category WHERE id = :id",
        params! {
            "id" => id,
            "title" => title,
            "description" => description,
            "completed" => completed,
            "category" => category.as_str(),
        },
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_task(id: i32) -> Result<(), String> {
    let pool = get_connection()?;
    let mut conn = pool.get_conn().map_err(|e| e.to_string())?;
    conn.exec_drop(
        "DELETE FROM tasks WHERE id = :id",
        params! {
            "id" => id,
        },
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn filter_tasks(
    completed_filter: Option<bool>,
    category_filter: Option<String>,
) -> Result<Vec<Task>, String> {
    let mut tasks = get_tasks()?;
    println!("All tasks before filtering: {:?}", tasks);
    println!("Category filter: {:?}", category_filter);
    println!("Completed filter: {:?}", completed_filter);


    // CATEGORY FILTER
    if let Some(cat_str) = category_filter {
        if let Some(category) = Category::from_str(&cat_str) {
            tasks.retain(|task| task.category == category);
        }
    }

    // COMPLETED SORT
    if let Some(completed) = completed_filter {
        tasks.sort_by(|a, b| {
            let a_completed = a.completed != 0;
            let b_completed = b.completed != 0;
            if completed {
                b_completed.cmp(&a_completed) // completed on top
            } else {
                a_completed.cmp(&b_completed) // uncompleted on top
            }
        });
    }
    println!("Filtered tasks: {:?}", tasks);
    Ok(tasks)
}




pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_tasks,
            create_task,
            update_task,
            delete_task,
            filter_tasks
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
