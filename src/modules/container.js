import taskList from './task-list.js';

const container = () => {
  const container = document.createElement('div');
  container.classList.add('list-container');
  container.append(taskList());
  return container;
};

export default container;