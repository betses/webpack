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

class List {
  loadTodo = (parent) => {
    todo.sort((a, b) => a.index - b.index);

    todo.forEach((task) => {
      const el = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `task-${task.index}`;
      checkbox.addEventListener('change', (event) => this.handleCheckbox(task, event));

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

  render = () => {
    const parent = document.querySelector('#todo');

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    this.loadTodo(parent);
  };

  handleCheckbox = (task, event) => {
    const index = todo.findIndex((t) => task.index === t.index);

    if (index === -1) {
      return;
    }

    todo[index].completed = event.target.checked;

    this.render();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  List.render();
});
