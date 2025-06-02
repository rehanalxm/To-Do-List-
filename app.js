const addBtn = document.getElementById("addBtn");
const ul = document.getElementById("taskList");
const inp = document.getElementById("taskInput");
const themeToggle = document.getElementById("themeToggle");

// Load tasks from localStorage
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => createTask(task));
  
  // Load theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
});

// Add task
addBtn.addEventListener("click", () => {
  const val = inp.value.trim();
  if (val !== "") {
    createTask(val);
    saveTasks();
    inp.value = "";
  }
});

// Delete task
ul.addEventListener("click", event => {
  if (event.target.classList.contains("deleteBtn")) {
    event.target.parentElement.remove();
    saveTasks();
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Helper: Create Task Item
function createTask(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "deleteBtn";

  li.appendChild(delBtn);
  ul.appendChild(li);
}

// Helper: Save Tasks to LocalStorage
function saveTasks() {
  const tasks = [];
  ul.querySelectorAll("li").forEach(li => {
    tasks.push(li.firstChild.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
