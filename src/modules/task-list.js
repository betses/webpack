import tasks from './tasks.js';

const taskList = () => {
  const listOfTask = document.createElement('div');
  const tasksUl = document.createElement('ul');
  let tasksElement = '';
  for (let i = 0; i < tasks.length; i += 1) {
    tasksElement += `
        <li>
          <div>
            <input type="checkbox">
            ${tasks[i].description}
          </div>
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </li>
    `;
  }
  tasksUl.innerHTML = tasksElement;
  listOfTask.classList.add('list');
  tasksUl.className = 'lists';
  listOfTask.append(tasksUl);

  return listOfTask;
};

export default taskList;