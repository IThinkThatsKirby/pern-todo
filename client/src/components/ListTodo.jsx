import React, { useEffect, useState } from 'react';

const ListTodo = () => {
	const [todos, setTodos] = useState([]);
	const getTodos = async () => {
		try {
			const res = await fetch('http://localhost:5000/todos');
			const jsonData = await res.json();
			setTodos(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};
	const deleteTodo = async (id) => {
		try {
			await fetch(`http://localhost:5000/todos/${id}`, {
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
	return (
		<div className='overflow-y-scroll h-2/3 container w-full'>
			<table className='table-auto w-full border-collapse border border-slate-500 '>
				<caption className='caption-top'>Things to done</caption>
				<thead>
					<tr>
						<th className='px-10 border border-slate-300 line-clamp-1 truncate'>
							Description
						</th>
						<th className='border border-slate-300'>Edit</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.todo_id}>
							<td className='border border-slate-300 line-clamp-1'>
								{todo.description}
							</td>
							<td className='border border-slate-300 whitespace-nowrap space-x-2'>
								<button className='rounded-full px-2 bg-blue-500 text-gray-50 hover:bg-emerald-400'>
									edit
								</button>
								<button
									className='rounded-full px-2 bg-blue-500 text-gray-50 hover:bg-red-600'
									onClick={() => deleteTodo(todo.todo_id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListTodo;
