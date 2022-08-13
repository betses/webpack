// eslint-disable-next-line import/no-cycle
import render from '../index.js';

const handleCheckbox = (tasks, task, event) => {
  const newTask = tasks.tasks.find((t) => task.index === t.index);

  if (!newTask) {
    return;
  }

  newTask.completed = event.target.checked;

  tasks.editTask(task, newTask);

  render();
};

const handleEdit = (tasks, task, event) => {
  const newTask = {
    ...task,
    description: event.target.value,
  };

  tasks.editTask(task, newTask);
};

const handleDelete = (tasks, task) => {
  tasks.removeTask(task);

  render();
};

const handleTaskInput = (tasks, event) => {
  if (event.key !== 'Enter') return;

  tasks.addTask({
    description: event.target.value,
    completed: false,
    index: tasks.tasks.length + 1,
  });

  event.target.value = '';

  render();
};

const handleClear = (tasks) => {
  tasks.clearCompletedTasks();

  render();
};

export {
  handleCheckbox, handleEdit, handleDelete, handleTaskInput, handleClear,
};
