import { getProjectArr } from "./storage.js";

// Select the last saved project when the app starts.
const projects = getProjectArr();
let currentProject = projects.at(-1);

// Change the project currently displayed.
function changeCurrentProject(id) {
  currentProject = findProject(id);
}

// Create a project object.
function createProject(id, name, description, deadline, priority) {
  return {
    id,
    name,
    description,
    deadline: new Date(deadline),
    priority,
    taskList: [],
  };
}

// Find a project by its id.
function findProject(id) {
  const projects = getProjectArr();
  const index = projects.findIndex((project) => project.id === id);
  return projects[index];
}

// Get the project currently displayed.
function getCurrentProject() {
  return currentProject;
}

// Remove a task from the current project.
function deleteATaskFromTaskListOfCurrentProject(id) {
  const index = currentProject.taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    currentProject.taskList.splice(index, 1);
  }
}

export {
  createProject,
  findProject,
  changeCurrentProject,
  getCurrentProject,
  deleteATaskFromTaskListOfCurrentProject,
};
