const dataProject = localStorage.getItem("projects");

// Load saved projects from the browser.
let projectArr = dataProject ? JSON.parse(dataProject) : [];

// Add a project and save it in the browser.
function storeProject(project) {
  projectArr.push(project);
  localStorage.setItem("projects", JSON.stringify(projectArr));
  projectArr = JSON.parse(localStorage.getItem("projects"));
}

// Update a project and save the changes.
function updateProject(projectId, updatedProject) {
  const index = projectArr.findIndex((project) => project.id === projectId);
  if (index !== -1) {
    projectArr[index] = updatedProject;
    localStorage.setItem("projects", JSON.stringify(projectArr));
    projectArr = JSON.parse(localStorage.getItem("projects"));
  }
}

// Remove a task from a saved project.
function deleteTask(projectId, taskId) {
  const projectIndex = projectArr.findIndex(
    (project) => project.id === projectId,
  );
  if (projectIndex === -1) return;

  const taskIndex = projectArr[projectIndex].taskList.findIndex(
    (task) => task.id === taskId,
  );
  if (taskIndex === -1) return;

  projectArr[projectIndex].taskList.splice(taskIndex, 1);
  localStorage.setItem("projects", JSON.stringify(projectArr));
}

// Get all saved projects.
function getProjectArr() {
  return projectArr;
}

export { storeProject, getProjectArr, updateProject, deleteTask };
