// Elements in the task details panel.
const taskTitle = document.querySelector(".task-title");
const taskPriority = document.querySelector(".task-priority");
const taskDescription = document.querySelector(".task-description");
const taskNotes = document.querySelector(".task-notes");
const taskDeadline = document.querySelector(".task-deadline");
const deleteTask = document.querySelector(".delete-task");
const rightPanel = document.querySelector(".right-bar");

const taskInfos = [taskTitle, taskPriority, taskDescription, taskNotes];

// Show the details of one task.
// eslint-disable-next-line max-params
function displayTaskInfo(title, priority, description, notes, deadline) {
  showRightPanel();

  // Clear the previous task details.
  for (const infos of taskInfos) {
    infos.textContent = "";
  }

  taskTitle.textContent = title;
  taskPriority.textContent = priority;
  taskDescription.textContent = description;
  taskNotes.textContent = notes;
  taskDeadline.textContent = deadline;
}

// Hide the task details panel.
function hiddenRightPanel() {
  rightPanel.classList.add("hidden");
}

// Show the task details panel.
function showRightPanel() {
  rightPanel.classList.remove("hidden");
}

export { displayTaskInfo, hiddenRightPanel, showRightPanel };
