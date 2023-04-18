import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodo = (prop) => {
	const [todos, setTodos] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [todoInfo, setTodoInfo] = useState({});
	const editTodos = (x) => {
		setTodoInfo(x);
		setIsOpen(true);
	};
	const closeEdit = () => {
		setIsOpen(false);
	};
	const getTodos = async () => {
		try {
			const res = await fetch(`http://localhost:${process.env.PORT}/todos`);
			const jsonData = await res.json();
			setTodos(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};
	const deleteTodo = async (id) => {
		try {
			await fetch(`/todos/${id}`, {
				method: 'DELETE',
			});
			getTodos();
		} catch (err) {
			console.error(err.message);
		}
	};
	useEffect(() => {
		getTodos();
	}, []);
	useEffect(() => {
		console.log(prop);
		getTodos();
	}, [prop]);
	return (
		<div className='overflow-x-auto h-auto w-full'>
			<div hidden={!isOpen}>
				<EditTodo
					open={isOpen}
					onClose={closeEdit}
					todoInfo={todoInfo}
					upDList={prop}
				/>
			</div>
			<table className='table-fixed border-collapse border border-slate-500 w-full'>
				<caption className='caption-top'>Things to done</caption>
				<thead>
					<tr>
						<th className='border border-slate-300 w-auto'>Description</th>
						<th className='border border-slate-300 w-32'>Edit</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => {
						console.log(todos);
						return (
							<tr key={todo.todo_id}>
								<td className='border border-slate-300 truncate'>
									{todo.description}
								</td>
								<td className='border border-slate-300 flex justify-evenly'>
									<button
										className='rounded-full px-2 bg-blue-500 text-gray-50 hover:bg-emerald-400'
										onClick={() => editTodos(todo)}
									>
										Edit
									</button>
									<button
										className='rounded-full px-2 bg-blue-500 text-gray-50 hover:bg-red-600'
										onClick={() => deleteTodo(todo.todo_id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListTodo;
