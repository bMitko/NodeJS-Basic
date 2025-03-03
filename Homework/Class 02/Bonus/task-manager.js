import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { error } from 'console';
// import { v4 as uuidv4 } from 'uuid';

// Fix __dirname and __filename
const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);

// Paths
const tasksFile = path.join(__dirname, 'data', 'tasks.json'); // Path to the Database

// Read all tasks from the database
export function readAllTasks() {
	const tasks = fs.readFileSync(tasksFile);
	const parsedTasks = JSON.parse(tasks);
	return parsedTasks;
}

// Get a single task

// Create a new task
export function createTask(title, description) {
	const tasks = readAllTasks();

	const newTask = {
		// email: `(${title}.replace(/\s/g, '')@mail.com)`,
		id: uuidv4(),
		title,
		description,
		completed: false,
		createdAt: new Date().toISOString(), // 12/12/2025
	};

	tasks.push(newTask);

	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Update a task
export function updateTask(id, title, description) {
	const tasks = readAllTasks();

	// find the task
	const taskIndex = tasks.findIndex(task => task.id === id);

	if (taskIndex < 0) {
		throw new Error(`Task with ${id} not found.`);
	}

	// update the task
	tasks[taskIndex].title = title;
	tasks[taskIndex].description = description;

	// save it back
	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Delete a task
export function deleteTask(id) {
	// read all tasks
	const tasks = readAllTasks();

	const filteredTasks = tasks.filter(task => task.id !== id);

	// save all tasks back to DB
	fs.writeFileSync(tasksFile, JSON.stringify(filteredTasks, null, 2));
}

export function markTaskAsCompleted(id){
	const tasks = readAllTasks();

	const taskIndex = tasks.findIndex(task => task.id === id);

	if (taskIndex < 0) {
		throw new Error(`Task with ${id} not found.`);
	}

	tasks[taskIndex].completed = true;

	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

export function addOwner(id, email){
	const tasks = readAllTasks();
	const taskIndex = tasks.findIndex(task => task.id === id)

	if(taskIndex < 0){
		throw new error (`Task with ${id} not found.`)
	}

	tasks[taskIndex].owner = email;

	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

export function getTasksByOwner(email){
	const tasks = readAllTasks();
	const taskOwner = tasks.filter(task => task.owner === email)
	
	console.log(`Task(s) with owner(${email}):`, taskOwner)
}

export function deleteAll(){
	fs.writeFileSync(tasksFile, "[]")
}

