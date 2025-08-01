use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize)]
pub enum Category {
    School,
    FreeTime,
    Home,
}

impl Category {
    pub fn as_str(&self) -> &'static str {
        match self {
            Category::School => "School",
            Category::FreeTime => "Free Time",
            Category::Home => "Home",
        }
    }

    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "School" => Some(Category::School),
            "Free Time" => Some(Category::FreeTime),
            "Home" => Some(Category::Home),
            _ => None,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Task {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub completed: i8,
    pub category: Category,
}
