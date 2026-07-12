// Login modal.
const loginModal = document.querySelector(".login-modal-overlay");
function hiddenLoginModal() {
  loginModal.classList.add("hidden");
}
function showLoginModal() {
  loginModal.classList.remove("hidden");
}

// Project modal.
const addProjectModal = document.querySelector(".project-modal-overlay");
function hiddenProjectModal() {
  addProjectModal.classList.add("hidden");
}
function showProjectModal() {
  addProjectModal.classList.remove("hidden");
}

// Task modal.
const addTodoModal = document.querySelector(".todo-modal-overlay");
function showTodoModal() {
  addTodoModal.classList.remove("hidden");
}
function hiddenTodoModal() {
  addTodoModal.classList.add("hidden");
}

export {
  showLoginModal,
  hiddenLoginModal,
  hiddenProjectModal,
  showProjectModal,
  hiddenTodoModal,
  showTodoModal,
};
