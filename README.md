# PersonalStudyApp

A focused, all-in-one **desktop study companion**. Plan tasks, sync your calendar, and listen to music — all in a single window. Built with **React + Vite** and shipped as a native desktop app via **Tauri** with a **MySQL** backend.

> Created and maintained by **Oscar Peach**

---

## ✨ Features

- **Todo Manager (CRUD + persistence)**  
  Create, update, complete, and delete tasks. Data is persisted in **MySQL**.
- **Google Calendar Integration**  
  See events without leaving the app (designed for study planning).
- **Soundcloud / Music Integration**  
  Play music to help you focus while studying.
- **Modern, clean UI**  
  Fast startup, native window chrome, and smooth interactions powered by **Vite + React** inside **Tauri**.

---

## 🧱 Tech Stack

- **Frontend:** React + Vite (HTML, CSS, JavaScript/JSX)
- **Desktop Runtime:** Tauri (Rust)
- **Backend / Storage:** MySQL (SQL schema included in repo)

---

## 📦 Repository Layout

- `src/` – React UI (components, hooks, styles)
- `src-tauri/` – Tauri app (Rust commands, config, bundling)
- `StudyAppToDoList.sql` – MySQL schema for the Todo feature
- `index.html`, `vite.config.js`, `package.json` – Vite/React entry and tooling

---

## 🚀 Quick Start

### 1) Prerequisites
- **Node.js** (v16+)
- **Rust + Cargo** (for Tauri)
- **MySQL Server** (local or container)
- **Visual Studio Build Tools** (Windows only, for compiling Rust)

### 2) Clone & Install
```bash
git clone https://github.com/Oscip/personal-study-app.git
cd personal-study-app
git checkout development

# install frontend dependencies
npm install
```

### 3) Environment Variables
Create a `.env` file in the root directory with the following content (adjust values as needed):
```env
VITE_GOOGLE_CALENDAR_URL="YOUR_GOOGLE_CALENDAR_API_URL"
```
### 4) Run the MySQL Server
If you don’t have MySQL installed, you can run it quickly with Docker:
```bash
  docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8
```

### 5) Database Setup (MySQL)

1. Start MySQL (local or Docker).

2. Create a database user and database (example):
```sql
CREATE DATABASE StudyAppToDoList;
CREATE USER 'study_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON StudyAppToDoList.* TO 'study_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Import the schema:

```bash
  mysql -u study_user -p StudyAppToDoList < StudyAppToDoList.sql
```



### 6) Run the Desktop App (Dev)
Go into the project's root directory and run 
```bash
  npm run tauri dev
```

This starts the Vite dev server and launches the Tauri window.

---

## Installation

### Running the App on Windows

To use this app as a standalone desktop application:

1. Build the application:
```bash
npm run tauri build
```

2. After the build finishes, the installer and executable will be located in:
```bash
src-tauri/target/release/bundle/msi/   (installer)
src-tauri/target/release/bundle/app/   (portable .exe)
```

3. Install or run the app:

Double-click the .msi file to install the application on your system.

Or run the .exe file directly as a portable version (no installation needed).

---


## 🏗️ Building for Production

Tauri makes small, native installers.

Storage: 15–30MB depending on platform.

### build optimized frontend + native app bundle
```bash
npm run build
npm run tauri build
```

The installer/binary will be generated under src-tauri/target/ (platform-specific). (Standard Tauri behavior.)


---


## 🔌 Integrations
### Google Calendar

- View your events directly in the app.

- Requires Google API credentials (set up via Google Cloud Console).


### Soundcloud / Music

- Embedded music for focus.

- No login required; uses public Soundcloud tracks.

---


## Visualisation
### 📸 Screenshots

#### Dashboard / Home

![Home](docs/images/to-do-list.png)

#### Task CRUD

![Tasks](docs/images/create.png)

![Tasks](docs/images/edit.png)

#### Calendar View

![Calendar](docs/images/google-calendar.png)

#### Music

![Player](docs/images/soundcloud.png)


### 🎥 Short Demo Video

https://github.com/user-attachments/assets/11324ae4-67b1-40f8-b33a-3753789e94a4

---

## 👤 Author

**Oscar Peach** — creator of personal-study-app.
The repository description and README credit Oscar as the author.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.