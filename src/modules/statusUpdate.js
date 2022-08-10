import Tasks from '../tasks/Task.js';
import List from './list.js';

const tasks = new Tasks();
const lists = new List();
class StatusUpdate {
  handleCheckbox = (task, event) => {
    const index = tasks.tasks.findIndex((t) => task.index === t.index);

    if (index === -1) {
      return;
    }

    tasks.tasks[index].completed = event.target.checked;

    // @todo: replace the affected element only?
    lists.render();
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
      input.addEventListener('keyup', (event) => lists.handleEdit(task, event));

      const deleteButton = document.createElement('span');
      deleteButton.classList.add('delete-button', 'material-symbols-outlined');
      deleteButton.innerText = 'delete';
      deleteButton.addEventListener('click', () => lists.handleDelete(task));

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
}

export default StatusUpdate;