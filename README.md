# Todo List

Todo List is a browser-based project and task management application. It helps users organise work into projects, keep track of individual tasks, and quickly see what is due today or coming up next.

The application stores project data in the browser, so projects and tasks remain available after a page refresh on the same device.

## Features

- Enter a name and email to personalise the workspace.
- Create projects with a name, description, deadline, and priority.
- Add tasks to the currently selected project.
- Give each task a title, description, due date, priority, and optional notes.
- Browse projects from the sidebar and view the number of tasks in each one.
- Select a task to view its full details in a dedicated side panel.
- Delete tasks when they are no longer needed.
- See automatically updated counts for tasks due today and upcoming tasks.
- Keep projects and tasks in `localStorage` between page refreshes.

## User Experience

The interface is designed around a clear three-part workspace: a sidebar for navigation, a central task list for the active project, and a details panel for the selected task. This keeps the most important actions close at hand while preserving context.

Forms are presented in modals to keep the main workspace uncluttered. The app also prevents users from adding a task before creating a project and asks for required information before saving forms.

## What I Learned

This project gave me practical experience building an interactive application with vanilla JavaScript and organising it around separation of responsibilities.

- **Feature modules** define the project, task, and storage logic.
- **UI components** are responsible for rendering the sidebar, task list, and task-details panel.
- **Event handlers** connect user actions to application logic and UI updates.
- **Form utilities** validate and retrieve user input.

Keeping these responsibilities separate made the code easier to understand, change, and maintain. I also practised DOM manipulation, event delegation, browser storage with `localStorage`, and managing the current project and task state.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES modules)
- Vite
- `localStorage`

## Run Locally

```bash
git clone https://github.com/237Developer/Todo_List.git
cd Todo_List
npm install
npm run dev
```

Vite will display a local URL in the terminal. Open it in your browser to use the app.
