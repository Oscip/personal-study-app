# PersonalStudyApp

**PersonalStudyApp** is a productivity-focused desktop application designed and built entirely by **Oscar Peach**. The app is tailored for personal study routines and helps with task management and scheduling. It integrates Spotify for music, Google Calendar for event management, and a full-featured Todo list with a MySQL backend.

---

## ✨ Features

- **Spotify Integration**: Embedded player to enjoy music while studying.
- **Google Calendar Integration**: View and manage events directly within the app.
- **Todo List**: Create, update, and delete tasks with persistent backend storage.
- **MySQL Backend**: Manages and stores tasks/data efficiently.
- **User Interface**: Clean, modern, and user-friendly design.

---

## 🧰 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Desktop Framework**: [Tauri](https://tauri.app/)
- **Backend**: [MySQL](https://www.mysql.com/)
- **Languages**: HTML, CSS, JS, JSX (Frontend), Rust, SQL (Backend)

---

## ⚙️ Setup & Usage

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Rust and Cargo](https://rustup.rs)
- [MySQL Server](https://www.mysql.com/)

### Recommended IDE Setup

- **IntelliJ** with:
  - [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) extension
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Installation

```bash
# Clone the repository
https://github.com/Oscip/PersonalStudyApp.git
cd PersonalStudyApp

# Install frontend dependencies
npm install
```

### Configure MySQL Backend

- Ensure a MySQL server is running
- Create a database and configure credentials in the backend config file (e.g., `.env` or directly in code if applicable)

### Run the App

```bash
npm run tauri dev
```

---

## © Credit

Made with by **Oscar Peach**
