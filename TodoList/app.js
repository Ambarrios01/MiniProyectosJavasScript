const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

const STORAGE_KEY = "tasks_v1";

// ---------- LocalStorage ----------
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- Render ----------
function createTaskElement(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  li.innerHTML = `
    <span class="task-text ${task.completed ? "completed" : ""}">${escapeHTML(task.text)}</span>
    <div class="task-actions">
      <button class="edit-btn">Editar</button>
      <button class="delete-btn">Eliminar</button>
    </div>
  `;

  // Animación al agregar (solo visual)
  li.classList.add("task-enter");
  setTimeout(() => li.classList.remove("task-enter"), 400);

  return li;
}

function renderAll() {
  taskList.innerHTML = "";
  const tasks = loadTasks();
  tasks.forEach((t) => taskList.appendChild(createTaskElement(t)));
}

// ---------- Utils ----------
function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateTask(id, updater) {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  tasks[index] = updater(tasks[index]);
  saveTasks(tasks);
}

function removeTask(id) {
  const tasks = loadTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

// ---------- Actions ----------
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text,
    completed: false,
  };

  const tasks = loadTasks();
  tasks.unshift(newTask); // la agrega arriba
  saveTasks(tasks);

  // Render rápido solo de la nueva tarea (sin redibujar todo)
  const li = createTaskElement(newTask);
  taskList.prepend(li);

  taskInput.value = "";
  taskInput.focus();
}

// Delegación de eventos (sirve para items nuevos también)
taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;

  //  Completar tarea: click en el texto
  if (e.target.classList.contains("task-text")) {
    updateTask(id, (t) => ({ ...t, completed: !t.completed }));
    e.target.classList.toggle("completed");
    return;
  }

  //  Eliminar
  if (e.target.classList.contains("delete-btn")) {
    // animación de salida simple
    li.style.transition = "0.25s";
    li.style.opacity = "0";
    li.style.transform = "translateY(-6px)";

    setTimeout(() => {
      removeTask(id);
      li.remove();
    }, 250);
    return;
  }

  //  Editar
  if (e.target.classList.contains("edit-btn")) {
    const textEl = li.querySelector(".task-text");
    const currentText = textEl.textContent;

    const newText = prompt("Editar tarea:", currentText);
    if (newText === null) return; // canceló
    const cleaned = newText.trim();
    if (!cleaned) return;

    updateTask(id, (t) => ({ ...t, text: cleaned }));
    textEl.textContent = cleaned;
    return;
  }
});

// ---------- Events ----------
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// ---------- Init ----------
renderAll();
