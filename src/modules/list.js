import Tasks from '../tasks/Task.js';

const tasks = new Tasks();

class List {
  handleEdit = (task, event) => {
    tasks.editTask(task, event.target.value);
  };

  handleDelete = (task) => {
    tasks.removeTask(task);

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

  render = () => {
    const parent = document.querySelector('#todo');

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    this.loadTodo(parent);
  };
}
export default List;