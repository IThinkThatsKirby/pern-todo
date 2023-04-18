require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js');
const port = process.env.PORT;
const path = require('path');
//middleware
app.use(cors());
app.use(express.json()); // gives access to req.body
app.use(express.static(path.join(__dirname, '../client/dist')));

// Set up CORS headers
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//routes

//create todo
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});
//get all todo
app.get('/todos', async (req, res) => {
	console.log('here');
	try {
		const allTodos = await pool.query('SELECT * FROM todo');
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});
//get a todo
app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
			id,
		]);
		res.json(todo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});
//update a todo
app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool.query(
			'UPDATE todo SET description = $1 WHERE todo_id = $2',
			[description, id]
		);
		res.json('todo was updated');
	} catch (err) {
		console.error(err.message);
	}
});
//delete a todo
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
			id,
		]);
		res.json('todo was deleted');
	} catch (err) {
		console.error(err.message);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
