import { fallbackQuotes, starterTasks } from "./modules/data.js";
import { createId, escapeHtml, formatShortDate, isToday } from "./modules/utils.js";

const STORAGE_KEY = "ruang-kampus-tasks-v1";
const priorityRank = { high: 0, medium: 1, low: 2 };

export class TaskItem {
  constructor({ id = createId(), title, course = "Umum", priority = "medium", dueDate = "", completed = false, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.title = title.trim();
    this.course = course;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toggle() {
    return new TaskItem({ ...this, completed: !this.completed });
  }

  update(changes) {
    return new TaskItem({ ...this, ...changes });
  }

  toJSON() {
    return { id: this.id, title: this.title, course: this.course, priority: this.priority, dueDate: this.dueDate, completed: this.completed, createdAt: this.createdAt };
  }
}

export class DashboardApp {
  constructor(elements) {
    this.elements = elements;
    this.state = { tasks: [], filter: "all", query: "" };
  }

  init() {
    this.state.tasks = this.readTasks();
    this.render();
    this.loadQuote();
  }

  readTasks() {
    try {
      const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const source = Array.isArray(savedTasks) ? savedTasks : starterTasks;
      return source.map((task) => new TaskItem(task));
    } catch (error) {
      console.warn("Data agenda tidak dapat dibaca.", error);
      return starterTasks.map((task) => new TaskItem(task));
    }
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.tasks));
  }

  addTask(taskData) {
    const task = new TaskItem(taskData);
    this.state.tasks = [...this.state.tasks, task];
    this.saveTasks();
    this.render();
  }

  updateTask(id, changes) {
    this.state.tasks = this.state.tasks.map((task) => task.id === id ? task.update(changes) : task);
    this.saveTasks();
    this.render();
  }

  toggleTask(id) {
    this.state.tasks = this.state.tasks.map((task) => task.id === id ? task.toggle() : task);
    this.saveTasks();
    this.render();
  }

  deleteTask(id) {
    this.state.tasks = this.state.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.render();
  }

  clearCompleted() {
    this.state.tasks = this.state.tasks.filter((task) => !task.completed);
    this.saveTasks();
    this.render();
  }

  setFilter(filter) {
    this.state.filter = filter;
    this.render();
  }

  setQuery(query) {
    this.state.query = query.trim().toLowerCase();
    this.render();
  }

  getFilteredTasks() {
    const { tasks, filter, query } = this.state;
    let filteredTasks = tasks.filter((task) => filter === "today" ? isToday(task.dueDate) : filter === "open" ? !task.completed : filter === "done" ? task.completed : true);
    filteredTasks = filteredTasks.filter((task) => `${task.title} ${task.course}`.toLowerCase().includes(query));
    return filteredTasks.sort((first, second) => Number(first.completed) - Number(second.completed) || priorityRank[first.priority] - priorityRank[second.priority] || first.dueDate.localeCompare(second.dueDate));
  }

  getSummary() {
    const { tasks } = this.state;
    const completed = tasks.filter(({ completed: isCompleted }) => isCompleted).length;
    const today = tasks.filter(({ dueDate, completed: isCompleted }) => isToday(dueDate) && !isCompleted).length;
    return { total: tasks.length, completed, today, progress: tasks.length ? Math.round((completed / tasks.length) * 100) : 0 };
  }

  render() {
    const tasks = this.getFilteredTasks();
    const summary = this.getSummary();
    this.elements.taskList.innerHTML = tasks.map((task) => this.taskTemplate(task)).join("");
    this.elements.emptyState.hidden = tasks.length !== 0;
    this.elements.totalCount.textContent = summary.total;
    this.elements.todayCount.textContent = summary.today;
    this.elements.completedCount.textContent = summary.completed;
    this.elements.progressPercent.textContent = `${summary.progress}%`;
    this.elements.progressBar.style.width = `${summary.progress}%`;
    this.elements.progressCaption.textContent = summary.total ? `${summary.completed} dari ${summary.total} tugas sudah dituntaskan.` : "Mulai dari satu tugas kecil.";
    document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("active", button.dataset.filter === this.state.filter));
  }

  taskTemplate({ id, title, course, priority, dueDate, completed }) {
    const dueClass = dueDate && dueDate < new Date().toISOString().slice(0, 10) && !completed ? "overdue" : "";
    return `
      <article class="task-card ${completed ? "done" : ""}" data-task-id="${id}">
        <button class="complete-button ${completed ? "completed" : ""}" type="button" data-action="toggle" aria-label="${completed ? "Tandai belum selesai" : "Tandai selesai"}">${completed ? "✓" : ""}</button>
        <div><h3 class="task-title">${escapeHtml(title)}</h3><div class="task-meta"><span class="priority-dot ${priority}"></span><span class="course-label">${escapeHtml(course)}</span><span class="due-label ${dueClass}">◷ ${formatShortDate(dueDate)}</span></div></div>
        <div class="task-actions"><button class="task-action" type="button" data-action="edit" aria-label="Edit ${escapeHtml(title)}">✎</button><button class="task-action delete" type="button" data-action="delete" aria-label="Hapus ${escapeHtml(title)}">×</button></div>
      </article>`;
  }

  async loadQuote() {
    const { quoteText, quoteAuthor, refreshQuote } = this.elements;
    quoteText.textContent = "Memuat kutipan untuk menyemangati harimu…";
    quoteAuthor.textContent = "Menghubungkan ke sumber inspirasi";
    refreshQuote.disabled = true;
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Kutipan tidak tersedia");
      const { quote, author } = await response.json();
      quoteText.textContent = `“${quote}”`;
      quoteAuthor.textContent = `— ${author}`;
    } catch (error) {
      const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteText.textContent = `“${fallback.quote}”`;
      quoteAuthor.textContent = `— ${fallback.author} • mode offline`;
    } finally {
      refreshQuote.disabled = false;
    }
  }
}
