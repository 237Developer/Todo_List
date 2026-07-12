import { getCurrentProject } from "./project.js";

// Select the last task when the app starts.
const { projectId, id } = getCurrentProject()?.taskList?.at(-1) || {};
let currentTask = projectId && id ? { projectId, id } : {};

// Create a task object.
// eslint-disable-next-line max-params
function createTask(
  id,
  projectId,
  todoTitle,
  todoDescription,
  todoDeadline,
  todoPriority,
  todoNotes,
) {
  return {
    id,
    projectId,
    todoTitle,
    todoDescription,
    todoDeadline: new Date(todoDeadline),
    todoPriority,
    todoNotes,
  };
}

// Get the task currently selected.
function getCurrentTask() {
  return currentTask;
}

// Change the task currently selected.
function changeCurrentTask(
  projectId,
  id = getCurrentProject().taskList.at(-1).id,
) {
  if (!id) {
    currentTask = {};
  }

  currentTask = { projectId, id };
}

// Find a task in the current project.
function findCurrentTask(id) {
  const currentProject = getCurrentProject();
  const task = currentProject.taskList.find((elt) => elt.id === id);
  return task;
}

export { createTask, getCurrentTask, changeCurrentTask, findCurrentTask };
