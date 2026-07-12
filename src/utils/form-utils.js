
// Project form fields.
const projectName = document.querySelector('.project-name-form');
const projectDescription = document.querySelector('.project-description-form');
const projectDeadline = document.querySelector('.project-date-form');
const projectPriority = document.querySelector('.project-priority-form');

function isAllProjectModalInputFilled() {
	const inputsArray = [projectName, projectDescription, projectDeadline, projectPriority];
	return inputsArray.every(elt => elt.value != '');
}

function resetProjectModalInput() {
	const form = document.querySelector('.project-modal-form');
	form.reset();
}

function getProjectInfos() {
	return {
		projectName: projectName.value,
		projectDescription: projectDescription.value,
		projectDeadLine: projectDeadline.value,
		projectPriority: projectPriority.value,
	};
}

// Login form fields.
const userName = document.querySelector('.login-user-name');
const userSurname = document.querySelector('.login-user-surname');
const userEmail = document.querySelector('.login-user-email');

function isAllLoginModalInputFilled() {
	const inputsArray = [userName, userSurname, userEmail];

	return inputsArray.every(elt => elt.value != '');
}

function resetLoginModalInput() {
	const form = document.querySelector('.login-modal-form');
	form.reset();
}

function getUserInfos() {
	return {
		userName: userName.value,
		userSurname: userSurname.value,
		userEmail: userEmail.value,
	};
}

// Task form fields.

const todoTitle = document.querySelector('.todo-title');
const todoDescription = document.querySelector('.todo-description');
const todoDeadline = document.querySelector('.todo-deadline');
const todoPriority = document.querySelector('.todo-priority');
const todoNotes = document.querySelector('.todo-notes');

function isAllTodoModalInputFilled() {
	const inputsArray = [todoTitle, todoDescription, todoDeadline, todoPriority, todoNotes];
	return inputsArray.every(input => input.value != '');
}

function resetTodoInputs() {
	const form = document.querySelector('.todo-modal-form');
	form.reset();
}

function getTaskInfos() {
	return {
		todoTitle: todoTitle.value,
		todoDescription: todoDescription.value,
		todoDeadline: todoDeadline.value,
		todoPriority: todoPriority.value,
		todoNotes: todoNotes.value,
	};
}

export {
	isAllProjectModalInputFilled, resetProjectModalInput, isAllLoginModalInputFilled, resetLoginModalInput,
	getUserInfos, getProjectInfos, isAllTodoModalInputFilled, resetTodoInputs, getTaskInfos,
};
