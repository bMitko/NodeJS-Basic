import { markAsUncloneable } from 'worker_threads';
import {
	createTask,
	readAllTasks,
	updateTask,
	deleteTask,
    markTaskAsCompleted,
    addOwner,
    getTasksByOwner,
    deleteAll,
} from './task-manager.js';

function main() {
	// createTask('Do homework 2', 'Homework 2, Nodejs Basic');
	// createTask('Do homework 3', 'Homework 3, Nodejs Basic');
	// createTask('Do homework 4', 'Homework 4, Nodejs Basic');
	// createTask('Do homework 5', 'Homework 5, Nodejs Basic');

	// updateTask(
	// 	'324112412',
	// 	'Nov title',
	// 	'Nov description'
	// );

	// console.log('All tasks:', readAllTasks());

	// deleteTask('b3e1743e-5820-4dd6-92ec-4e07f5e5fd52');

	// console.log('All tasks:', readAllTasks());

    // markTaskAsCompleted("67390fb1-4244-427c-ad15-99afd56e8c1b")

    console.log('All tasks:', readAllTasks());

    addOwner("67390fb1-4244-427c-ad15-99afd56e8c1b", "some@mail.com")
    addOwner("22a566bd-9be6-475c-a82f-498ac793e301", "some@mail.com")

    console.log('All tasks:', readAllTasks());

    getTasksByOwner("some@mail.com")

    // deleteAll()

    console.log('All tasks:',  readAllTasks())
}

main();