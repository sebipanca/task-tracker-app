const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const taskList = document.getElementById('taskList');

// Event Listener for form submission
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form refresh
  const taskText = taskInput.value.trim();
  const category = categorySelect.value.trim();

  if (taskText && category) {
    addTask(taskText, category); // Add task to the list with category
    taskInput.value = ''; // Clear the input
    categorySelect.value = ''; // Reset category selection
  }
});

// Load saved tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from localStorage
  savedTasks.forEach(task => addTaskToDOM(task.text, task.category)); // Load task with category
}

function addTaskToDOM(taskText, category) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${taskText}</span> 
    <span class="category">${category}</span> 
    <button onclick="removeTask(this)">Delete</button>
  `;
  li.querySelector('.task-text').addEventListener('click', () => toggleCompletion(li));
  taskList.appendChild(li);
}

function addTask(task, category) {
  const taskData = {
    text: task.trim(),
    category: category.trim()
  };
  if (!taskData.text || !taskData.category) return;

  // Add the task to the DOM
  addTaskToDOM(taskData.text, taskData.category);

  // Save tasks to localStorage
  saveTasksToLocalStorage(taskData);
}

function saveTasksToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task); // Add new task to the array
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to localStorage
}

function removeTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector('.task-text').textContent;
  taskList.removeChild(li);

  // Remove task from localStorage
  removeTaskFromLocalStorage(taskText);
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText); // Remove task
  localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks
}

function toggleCompletion(taskItem) {
  taskItem.classList.toggle('completed');
  updateTaskInLocalStorage(taskItem);
}

function updateTaskInLocalStorage(taskItem) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskText = taskItem.querySelector('.task-text').textContent;
  const index = tasks.findIndex(task => task.text === taskText);

  if (index !== -1) {
    tasks[index] = {
      text: taskText,
      category: taskItem.querySelector('.category').textContent
    };
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
  }
}
