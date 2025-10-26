const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
  loadTasks();
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty");
    return;
  }
  const task = { text: taskText, completed: false };
  saveTask(task);
  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.onchange = () => toggleTask(li, task.text);

  const span = document.createElement("span");
  span.textContent = task.text;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  editBtn.onclick = () => editTask(task.text);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => deleteTask(task.text, li);

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach(task => renderTask(task));
}

function toggleTask(li, taskText) {
  li.classList.toggle("completed");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(t =>
    t.text === taskText ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(oldText) {
  const newText = prompt("Edit task:", oldText);
  if (newText && newText.trim() !== "") {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t =>
      t.text === oldText ? { ...t, text: newText } : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(taskText, li) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}