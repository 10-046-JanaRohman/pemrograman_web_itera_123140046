import { DashboardApp } from "./app.js";
import { formatLongDate } from "./modules/utils.js";

const elements = {
  currentDate: document.getElementById("current-date"), taskForm: document.getElementById("task-form"), taskTitle: document.getElementById("task-title"), titleError: document.getElementById("title-error"), newTaskButton: document.getElementById("new-task-button"), taskList: document.getElementById("task-list"), emptyState: document.getElementById("empty-state"), totalCount: document.getElementById("total-count"), todayCount: document.getElementById("today-count"), completedCount: document.getElementById("completed-count"), progressPercent: document.getElementById("progress-percent"), progressBar: document.getElementById("progress-bar"), progressCaption: document.getElementById("progress-caption"), searchTask: document.getElementById("search-task"), clearCompleted: document.getElementById("clear-completed"), quoteText: document.getElementById("quote-text"), quoteAuthor: document.getElementById("quote-author"), refreshQuote: document.getElementById("refresh-quote"), editDialog: document.getElementById("edit-dialog"), editForm: document.getElementById("edit-form"), closeDialog: document.getElementById("close-dialog"), editId: document.getElementById("edit-id"), editTitle: document.getElementById("edit-title"), editCourse: document.getElementById("edit-course"), editPriority: document.getElementById("edit-priority"), editDate: document.getElementById("edit-date")
};

const app = new DashboardApp(elements);
elements.currentDate.textContent = formatLongDate();
app.init();

const getFormData = (form) => Object.fromEntries(new FormData(form));
const showTitleError = (message = "") => {
  elements.taskTitle.closest(".form-field").classList.toggle("has-error", Boolean(message));
  elements.titleError.textContent = message;
};
const openEditDialog = (task) => {
  const { id, title, course, priority, dueDate } = task;
  elements.editId.value = id;
  elements.editTitle.value = title;
  elements.editCourse.value = course;
  elements.editPriority.value = priority;
  elements.editDate.value = dueDate;
  elements.editDialog.showModal();
  elements.editTitle.focus();
};

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskData = getFormData(elements.taskForm);
  if (taskData.title.trim().length < 3) {
    showTitleError("Judul tugas minimal terdiri dari 3 karakter.");
    return;
  }
  app.addTask(taskData);
  elements.taskForm.reset();
  showTitleError();
  elements.taskTitle.focus();
});

elements.taskTitle.addEventListener("input", () => showTitleError());
elements.newTaskButton.addEventListener("click", () => elements.taskTitle.focus());
elements.searchTask.addEventListener("input", ({ target }) => app.setQuery(target.value));
elements.refreshQuote.addEventListener("click", () => app.loadQuote());
elements.clearCompleted.addEventListener("click", () => {
  if (app.state.tasks.some(({ completed }) => completed)) app.clearCompleted();
});

document.querySelector(".filter-tabs").addEventListener("click", ({ target }) => {
  const button = target.closest("[data-filter]");
  if (button) app.setFilter(button.dataset.filter);
});

elements.taskList.addEventListener("click", ({ target }) => {
  const actionButton = target.closest("[data-action]");
  if (!actionButton) return;
  const taskCard = actionButton.closest("[data-task-id]");
  const task = app.state.tasks.find(({ id }) => id === taskCard.dataset.taskId);
  if (!task) return;
  const actions = { toggle: () => app.toggleTask(task.id), delete: () => app.deleteTask(task.id), edit: () => openEditDialog(task) };
  actions[actionButton.dataset.action]?.();
});

elements.editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = elements.editTitle.value.trim();
  if (title.length < 3) return;
  app.updateTask(elements.editId.value, { title, course: elements.editCourse.value, priority: elements.editPriority.value, dueDate: elements.editDate.value });
  elements.editDialog.close();
});

elements.closeDialog.addEventListener("click", () => elements.editDialog.close());
