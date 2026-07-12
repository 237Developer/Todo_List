import {
  handleLoginBtnClick,
  handleAddProjectBtnClick,
  handleProjectModalSubmit,
  handleAddTodoClick,
  handleTodoSaveClick,
  handleDomLoad,
  handleProjectClick,
  handleChangeCurrentTaskClick,
  handleDeleteBtnClick,
} from "./event.js";
import { renderStoredProjects } from "./src/components/side-bar-dom.js";
import { renderCurrentProjectTasks } from "./src/components/main-content-dom.js";

// Start the app and connect all buttons.
handleDomLoad();
handleLoginBtnClick();
handleAddProjectBtnClick();
handleProjectModalSubmit();
handleAddTodoClick();
handleTodoSaveClick();
handleProjectClick();
handleChangeCurrentTaskClick();
handleDeleteBtnClick();
