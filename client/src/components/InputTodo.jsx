import { useState } from 'react';
import React from 'react';

const InputTodo = () => {
	const [description, setDescription] = useState('');
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch('http://localhost:5000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			console.log(response);
			window.location = '/';
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<h1 className='text-center mt-2'>Todo List</h1>

			<form onSubmit={onSubmitForm}>
				<input
					type='text'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button
					type='submit'
					className='h-10 px-6 rounded-md bg-black text-white font-bold'
				>
					Add
				</button>
			</form>
		</>
	);
};

export default InputTodo;
