import { getProjectArr } from "../features/storage.js";

// Sidebar elements.
const userProfilImg = document.querySelector(".user-img-profil");
const userName = document.querySelector(".user-name");
const userEmail = document.querySelector(".user-email");
const nbrOfTodayTask = document.querySelector(".today .nbr-of-task");
const nbrOfUpcommingTask = document.querySelector(".futur .nbr-of-task");
const projectSection = document.querySelector(".project-section");

// Show the user's information in the sidebar.
function handleUserInfo(
  imageSrc = "assets/icons/black-person.svg",
  name,
  email,
) {
  userProfilImg.src = imageSrc;
  userName.innerText = name;
  userEmail.innerText = email;
}

// Show the number of tasks for today and later.
function showNbrOfTask(todayNbr, upcommingNbr) {
  nbrOfTodayTask.textContent = todayNbr;
  nbrOfUpcommingTask.textContent = upcommingNbr;
}

// Update the counters for today's and future tasks.
function updateTaskDateCounters() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let todayTasks = 0;
  let upcomingTasks = 0;

  for (const project of getProjectArr()) {
    for (const task of project.taskList) {
      const taskDate = new Date(task.todoDeadline);
      taskDate.setHours(0, 0, 0, 0);

      if (taskDate.getTime() === today.getTime()) {
        todayTasks += 1;
      } else if (taskDate > today) {
        upcomingTasks += 1;
      }
    }
  }

  showNbrOfTask(todayTasks, upcomingTasks);
}

// Add one project to the sidebar.
function showProject(projectName, id) {
  const project = document.createElement("div");
  project.dataset.id = id;
  project.innerHTML = `<div class="project"><img src="./assets/icons/web-icon.svg"><span>${projectName}</span></div><span class="project-task-count">0</span>`;

  // Place the project before the add-project button.
  projectSection.insertBefore(project, projectSection.children[1]);
}

// Show projects saved in the browser.
function renderStoredProjects() {
  const projects = getProjectArr();
  if (!projects || projects.length === 0) {
    return;
  }

  projects.forEach((project) => {
    showProject(project.name, project.id);
    updateProjectNbrTask(project.taskList.length, project.id);
  });
}

// Update the number of tasks for one project.
function updateProjectNbrTask(nbr, projectId) {
  const taskCount = document.querySelector(
    `[data-id="${CSS.escape(projectId)}"] .project-task-count`,
  );
  if (taskCount) {
    taskCount.textContent = nbr;
  }
}

// Highlight the selected project.
function highlightCurrentProject(id) {
  const project = document.querySelector(`[data-id=${CSS.escape(id)}]`);
  const higlightedProject = document.querySelector(".highlight-project");

  if (higlightedProject) {
    higlightedProject.classList.remove("highlight-project");
  }

  if (project) {
    project.classList.add("highlight-project");
  }
}

export {
  handleUserInfo,
  updateTaskDateCounters,
  showProject,
  renderStoredProjects,
  updateProjectNbrTask,
  highlightCurrentProject,
};
