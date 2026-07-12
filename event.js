import {
  isAllLoginModalInputFilled,
  resetLoginModalInput,
  getUserInfos,
  isAllProjectModalInputFilled,
  resetProjectModalInput,
  getProjectInfos,
  isAllTodoModalInputFilled,
  resetTodoInputs,
  getTaskInfos,
} from "./src/utils/form-utils.js";
import {
  hiddenLoginModal,
  showProjectModal,
  hiddenProjectModal,
  showTodoModal,
  hiddenTodoModal,
} from "./modal.js";
import { hiddenApp, showApp } from "./app.js";
import * as SideBar from "./src/components/side-bar-dom.js";
import {
  createProject,
  findProject,
  getCurrentProject,
  changeCurrentProject,
  deleteATaskFromTaskListOfCurrentProject,
} from "./src/features/project.js";
import {
  storeProject,
  updateProject,
  deleteTask,
} from "./src/features/storage.js";
import {
  createTask,
  getCurrentTask,
  changeCurrentTask,
  findCurrentTask,
} from "./src/features/task.js";
import {
  renderTask,
  renderCurrentProjectTasks,
  projectContent,
  highlightCurrentTask,
} from "./src/components/main-content-dom.js";
import {
  displayTaskInfo,
  hiddenRightPanel,
  showRightPanel,
} from "./src/components/task-right-panel.js";

// Check the login form when the user clicks the button.
function handleLoginBtnClick() {
  const loginBtn = document.querySelector(".login-button");
  loginBtn.addEventListener("click", () => {
    if (isAllLoginModalInputFilled()) {
      hiddenLoginModal();
      showApp();
      const { userName, userEmail } = getUserInfos();
      SideBar.handleUserInfo(undefined, userName, userEmail);
    } else {
      alert("please fill all the inputs");
    }
  });
}

// Open the project modal from each add-project button.
function handleAddProjectBtnClick() {
  const addProjectBtns = [...document.querySelectorAll(".add-project-btn")];

  for (const btn of addProjectBtns) {
    btn.addEventListener("click", () => {
      showProjectModal();
    });
  }
}

// Save a new project from the project form.
function handleProjectModalSubmit() {
  const submit = document.querySelector(".project-modal-submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (isAllProjectModalInputFilled()) {
      const id = crypto.randomUUID();
      const projectInfos = getProjectInfos();
      const project = createProject(id, ...Object.values(projectInfos));

      storeProject(project);
      changeCurrentProject(id);

      projectContent.replaceChildren();
      SideBar.showProject(Object.values(projectInfos)[0], id);
      renderCurrentProjectTasks();
      resetProjectModalInput();
      hiddenProjectModal();
      SideBar.highlightCurrentProject(id);
      hiddenRightPanel();
    } else {
      alert("please fill all the fields");
    }
  });
}

// Show the project selected in the sidebar.
function handleProjectClick() {
  const projectSection = document.querySelector(".project-section");
  if (!projectSection) {
    return;
  }

  projectSection.addEventListener("click", (event) => {
    const projectElement = event.target.closest("[data-id]");
    if (!projectElement || !projectSection.contains(projectElement)) {
      return;
    }

    const { id } = projectElement.dataset;
    if (!id) {
      return;
    }

    projectContent.replaceChildren();
    changeCurrentProject(id);
    SideBar.highlightCurrentProject(id);
    renderCurrentProjectTasks();
    hiddenRightPanel();

    // Show the last task when the project has tasks.
    const lastTask = getCurrentProject().taskList.at(-1);
    if (lastTask) {
      const {
        todoTitle,
        todoDescription,
        todoDeadline,
        todoPriority,
        todoNotes,
      } = lastTask;
      displayTaskInfo(
        todoTitle,
        `${todoPriority} Priority`,
        todoDescription,
        todoNotes,
        new Date(todoDeadline).toLocaleDateString("fr-FR"),
      );
      changeCurrentTask(getCurrentProject().id, lastTask.id);
      highlightCurrentTask(lastTask.id);
    }
  });
}

// Open the task form when a project is selected.
function handleAddTodoClick() {
  const addTodo = document.querySelector(".add-todo");
  addTodo.addEventListener("click", () => {
    const currentProject = getCurrentProject();
    if (!currentProject) {
      // eslint-disable-next-line no-alert
      alert("Create a project before adding a task.");
      return;
    }

    showTodoModal();
  });
}

// Save a new task in the current project.
function handleTodoSaveClick() {
  const saveTodo = document.querySelector(".todo-modal-actions .btn-primary");
  saveTodo.addEventListener("click", (e) => {
    e.preventDefault();
    if (isAllTodoModalInputFilled()) {
      const currentProject = getCurrentProject();
      // eslint-disable-next-line unicorn/no-global-object-property-assignment
      globalThis.currentProject = currentProject;
      const projectId = currentProject.id;
      const id = crypto.randomUUID();
      const taskInfos = getTaskInfos();
      const task = createTask(id, projectId, ...Object.values(taskInfos));

      currentProject.taskList.push(task);
      updateProject(projectId, currentProject);
      renderTask(task);
      SideBar.updateProjectNbrTask(currentProject.taskList.length, projectId);
      SideBar.updateTaskDateCounters();
      resetTodoInputs();
      hiddenTodoModal();
      showRightPanel();

      const {
        todoTitle,
        todoDescription,
        todoDeadline,
        todoPriority,
        todoNotes,
      } = task;
      displayTaskInfo(
        todoTitle,
        `${todoPriority} Priority`,
        todoDescription,
        todoNotes,
        new Date(todoDeadline).toLocaleDateString("fr-FR"),
      );
      changeCurrentTask(projectId, task.id);
      highlightCurrentTask(task.id);
    } else {
      // eslint-disable-next-line no-alert
      alert("you should fill all the inputs.");
    }
  });
}

// Show task details when a task is clicked.
function handleChangeCurrentTaskClick() {
  const currentProjectTask = document.querySelector(".content");
  if (!currentProjectTask) {
    return;
  }

  currentProjectTask.addEventListener("click", (event) => {
    const taskElement = event.target.closest("[data-id]");
    if (!taskElement || !currentProjectTask.contains(taskElement)) {
      return;
    }

    const { id, "project-id": projectId } = taskElement.dataset;
    if (!id) {
      return;
    }

    const task = findCurrentTask(id);
    const {
      todoTitle,
      todoDescription,
      todoDeadline,
      todoPriority,
      todoNotes,
    } = task;
    displayTaskInfo(
      todoTitle,
      `${todoPriority} Priority`,
      todoDescription,
      todoNotes,
      new Date(todoDeadline).toLocaleDateString("fr-FR"),
    );
    changeCurrentTask(projectId, task.id);
    highlightCurrentTask(task.id);
  });
}

// Load saved projects when the page is ready.
function handleDomLoad() {
  globalThis.addEventListener("DOMContentLoaded", () => {
    SideBar.renderStoredProjects();
    SideBar.updateTaskDateCounters();
  });

  globalThis.addEventListener("DOMContentLoaded", () => {
    const currentProject = getCurrentProject();
    if (currentProject) {
      renderCurrentProjectTasks();
      SideBar.highlightCurrentProject(currentProject.id);

      const lastTask = currentProject.taskList.at(-1);
      if (lastTask) {
        const {
          todoTitle,
          todoDescription,
          todoDeadline,
          todoPriority,
          todoNotes,
        } = lastTask;
        displayTaskInfo(
          todoTitle,
          todoPriority,
          todoDescription,
          todoNotes,
          new Date(todoDeadline).toLocaleDateString("fr-FR"),
        );
        changeCurrentTask(currentProject.id, lastTask.id);
        highlightCurrentTask(lastTask.id);
      }
    }
  });
}

// Delete the task shown in the details panel.
function handleDeleteBtnClick() {
  const deleteTaskBtn = document.querySelector(".delete-task");
  deleteTaskBtn.addEventListener("click", () => {
    const currentTask = getCurrentTask();
    if (!currentTask?.id) {
      return;
    }

    const currentProject = getCurrentProject();

    deleteTask(currentProject.id, currentTask.id);

    // Remove the deleted task from the page.
    const taskElement = projectContent.querySelector(
      `[data-id="${CSS.escape(currentTask.id)}"].todo`,
    );
    taskElement?.remove();

    deleteATaskFromTaskListOfCurrentProject(currentTask.id);
    SideBar.updateProjectNbrTask(
      currentProject.taskList.length,
      currentProject.id,
    );
    SideBar.updateTaskDateCounters();

    if (getCurrentProject().taskList.length === 0) {
      hiddenRightPanel();
      return;
    }

    const nextTask = currentProject.taskList.at(-1);
    const {
      todoTitle,
      todoDescription,
      todoDeadline,
      todoPriority,
      todoNotes,
    } = nextTask;

    // Show the task selected after the deletion.
    displayTaskInfo(
      todoTitle,
      `${todoPriority} Priority`,
      todoDescription,
      todoNotes,
      new Date(todoDeadline).toLocaleDateString("fr-FR"),
    );
    changeCurrentTask(currentProject.id, nextTask.id);
    highlightCurrentTask(nextTask.id);
  });
}

export {
  handleLoginBtnClick,
  handleAddProjectBtnClick,
  handleProjectModalSubmit,
  handleAddTodoClick,
  handleTodoSaveClick,
  handleDomLoad,
  handleProjectClick,
  handleChangeCurrentTaskClick,
  handleDeleteBtnClick,
};
