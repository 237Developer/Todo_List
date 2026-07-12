
const app = document.querySelector('.app');

function showApp() {
	app.classList.remove('hidden');
}

function hiddenApp() {
	app.classList.add('hidden');
}

export {showApp, hiddenApp};
