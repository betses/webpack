// eslint-disable-next-line no-unused-vars
import css from './app.css';

const todo = [
  {
    description: 'wash the dishes',
    completed: true,
    index: 5,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 1,
  },
];

const loadTodo = (parent) => {
  todo.sort((a, b) => a.index - b.index);

  todo.forEach((task) => {
    const el = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${task.index}`;
    // eslint-disable-next-line no-use-before-define
    checkbox.addEventListener('change', (event) => handleCheckbox(task, event));

    const label = document.createElement('label');
    label.innerText = task.description;
    label.setAttribute('for', `task-${task.index}`);

    if (task.completed) {
      checkbox.setAttribute('checked', 'checked');
      label.style.textDecoration = 'line-through';
      label.style.color = '#070707';
    }

    el.appendChild(checkbox);
    el.appendChild(label);
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

const handleCheckbox = (task, event) => {
  const index = todo.findIndex((t) => task.index === t.index);

  if (index === -1) {
    return;
  }

  todo[index].completed = event.target.checked;

  render();
};

document.addEventListener('DOMContentLoaded', () => {
  render();
});
