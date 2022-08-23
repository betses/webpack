import List from './list.js';

const lists = new List();
class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('todo.tasks') || '[]');
  }

  addTask(task) {
    this.tasks.push(task);

    this.updateLocalStorage();
  }

  getSortedTasks() {
    return this.tasks.sort((a, b) => a.index - b.index);
  }

  removeTask(task) {
    const index = this.tasks.findIndex((t) => task.index === t.index);

    if (index === -1) return;

    this.tasks.splice(index, 1);

    this.tasks = this.tasks.map((task, index) => ({
      ...task,
      index: index + 1,
    }));

    this.updateLocalStorage();
  }

  editTask(task, newTask) {
    const index = this.tasks.findIndex((t) => task.index === t.index);

    if (index === -1) return;

    this.tasks[index] = newTask;

    this.updateLocalStorage();
  }

  handleCheckbox = (task, event) => {
    const index = this.tasks.findIndex((t) => task.index === t.index);

    if (index === -1) {
      return;
    }

    this.tasks[index].completed = event.target.checked;
    // @todo: replace the affected element only?
    lists.render();
  };

  updateLocalStorage() {
    localStorage.setItem('todo.tasks', JSON.stringify(this.tasks));
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.completed);

    this.tasks = this.tasks.map((task, index) => ({
      ...task,
      index: index + 1,
    }));
    this.updateLocalStorage();
  }
}

export default Tasks;
