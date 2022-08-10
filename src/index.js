// eslint-disable-next-line no-unused-vars
import css from './app.css';
import Tasks from './tasks/Task.js';

const tasks = new Tasks();
class List {
  handleEdit = (task, event) => {
    tasks.editTask(task, event.target.value);
  };

  handleDelete = (task) => {
    tasks.removeTask(task);

    this.render();
  };

  handleCheckbox = (task, event) => {
    const index = tasks.tasks.findIndex((t) => task.index === t.index);

    if (index === -1) {
      return;
    }

    tasks.tasks[index].completed = event.target.checked;

    // @todo: replace the affected element only?
    this.render();
  };

  handleTaskInput = (event) => {
    if (event.key !== 'Enter') return;

    tasks.addTask({
      description: event.target.value,
      completed: false,
      index: tasks.tasks.length,
    });

    event.target.value = '';

    this.render();
  };

  loadTodo(parent) {
    const sortedTasks = tasks.getSortedTasks();

    sortedTasks.forEach((task) => {
      const el = document.createElement('li');
      el.setAttribute('tabindex', 0);
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `task-${task.index}`;
      checkbox.addEventListener('change', (event) => this.handleCheckbox(task, event));

      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;
      input.addEventListener('keyup', (event) => this.handleEdit(task, event));

      const deleteButton = document.createElement('span');
      deleteButton.classList.add('delete-button', 'material-symbols-outlined');
      deleteButton.innerText = 'delete';
      deleteButton.addEventListener('click', () => this.handleDelete(task));

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
  }

  render = () => {
    const parent = document.querySelector('#todo');

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    this.loadTodo(parent);
  };
}

const list = new List();

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#task-input')
    .addEventListener('keyup', list.handleTaskInput);
  list.render();
});
