import Tasks from '../tasks/Task.js';

const newList = require('../__mocks__/localStorage.js');

describe('add/delete functions', () => {
  global.localStorage = newList;
  const task = new Tasks();
  // const storeData = JSON.parse(localStorage.getItem('todo.tasks'));
  const newTask = {
    description: 'test1',
    completed: false,
    index: task.tasks.length,
  };
  task.addTask(newTask);
  const newTask2 = {
    description: 'test2',
    completed: false,
    index: task.tasks.length,
  };
  task.addTask(newTask2);
  const newTask3 = {
    description: 'test3',
    completed: false,
    index: task.tasks.length,
  };
  task.addTask(newTask3);
  test('AddTask and removeTask', () => {
    task.removeTask(newTask);
    task.getSortedTasks();
    // console.log(task.tasks);
    expect(task.tasks).toHaveLength(2);
    const storeData = JSON.parse(localStorage.getItem('todo.tasks'));
    // console.log(storeData);
    expect(storeData).toHaveLength(2);
    expect(storeData[0].description).toBe('test2');
    const remainingTask = [storeData[0], storeData[1]];
    expect(task.tasks).toEqual(remainingTask);
  });
  test('remove task', () => {
    const newTodoList1 = {
      description: 'task2',
      completed: false,
      index: task.tasks.length,
    };
    task.addTask(newTodoList1);
    task.removeTask(newTodoList1);
    expect(task.tasks[0].description).toBe('test2');
    expect(task.tasks).toHaveLength(2);
  });

  test('Editing', () => {
    task.editTask(newTask2, 'EDITED TEXT');
    // console.log(task.tasks);
    expect(task.tasks[1].description).toEqual('EDITED TEXT');
    expect(task.tasks).toHaveLength(2);
  });

  test('updateLocalStorage function exists', () => {
    expect(task.updateLocalStorage).toBeDefined();
  });

  // test(' updating an item completed status', () => {
  //   const newTodoList3 = {
  //     descrition: 'task5',
  //     completed: false,
  //     index: 3,
  //   };
  //   task.addTask(newTodoList3);
  //   task.handleCheckbox(newTodoList3, true);
  //   expect(task.tasks[3].completed).toBeTruthy();
  //   expect(task.tasks).toHaveLength(3);
  //   const storeData = JSON.parse(localStorage.getItem('todo.tasks'));
  //   expect(storeData).toHaveLength(3);
  // });
});
