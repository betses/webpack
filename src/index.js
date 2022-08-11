/* eslint-disable import/no-cycle */
import Tasks from './modules/Tasks.js';
import './app.css';

import {
  handleCheckbox,
  handleEdit,
  handleDelete,
  handleTaskInput,
  handleClear,
} from './modules/task-updates.js';

const tasks = new Tasks();

const loadTodo = (parent) => {
  const sortedTasks = tasks.getSortedTasks();

  sortedTasks.forEach((task) => {
    const el = document.createElement('li');
    el.setAttribute('tabindex', 0);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${task.index}`;
    checkbox.addEventListener('change', (event) => handleCheckbox(tasks, task, event));

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.description;
    input.addEventListener('keyup', (event) => handleEdit(tasks, task, event));

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button', 'material-symbols-outlined');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', () => handleDelete(tasks, task));

    if (task.completed) {
      checkbox.setAttribute('checked', 'checked');
      input.style.textDecoration = 'line-through';
      input.style.color = '#A3A3A3';
    }

    el.appendChild(checkbox);
    el.appendChild(input);
    el.appendChild(deleteButton);
    parent.appendChild(el);
  });
};

const render = () => {
  const parent = document.querySelector('#todo');

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  loadTodo(parent);
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#clearAllButton')
    .addEventListener('click', () => handleClear(tasks));

  document.querySelector('#task-input')
    .addEventListener('keyup', (event) => handleTaskInput(tasks, event));

  render();
});
export default render;
