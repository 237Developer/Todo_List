import { getCurrentProject } from "../features/project.js";

// Main area where tasks are displayed.
const projectContent = document.querySelector(".content");

// Add one task to the page.
function renderTask(task) {
  // Format the date for display.
  const dueDate = task.todoDeadline
    ? new Date(task.todoDeadline).toLocaleDateString("fr-FR")
    : "";

  const taskElement = document.createElement("div");
  taskElement.className = "todo";
  taskElement.dataset.projectId = task.projectId;
  taskElement.dataset.id = task.id;
  taskElement.innerHTML = `
        <div><input type="checkbox"><span>⠿</span></div>
        <div>${task.todoTitle} <div><img src="assets/icons/black-agenda.svg" alt=""><span>${dueDate}</span></div></div>
        <div><span class="priority">${task.todoPriority}</span><span class="more-option">...</span></div>
    `;
  projectContent.prepend(taskElement);
}

// Show every task in the current project.
function renderCurrentProjectTasks() {
  const currentProject = getCurrentProject();
  if (!currentProject) {
    return;
  }

  currentProject.taskList.forEach((task) => {
    renderTask(task);
  });
}

// Highlight the selected task.
function highlightCurrentTask(id) {
  // Escape the id before using it in a CSS selector.
  const task = document.querySelector(`[data-id=${CSS.escape(id)}].todo`);
  const higlightedTask = document.querySelector(".highlight-task");

  if (higlightedTask) {
    higlightedTask.classList.remove("highlight-task");
  }

  if (task) {
    task.classList.add("highlight-task");
  }
}

export {
  renderTask,
  renderCurrentProjectTasks,
  highlightCurrentTask,
  projectContent,
};
