import { useState } from 'react';
import React from 'react';

const InputTodo = (App) => {
	const [description, setDescription] = useState('');
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch('/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			App.onAddTodo();
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<form
			className='h-1/5 flex flex-col sm:flex-row sm:w-full sm:justify-center justify-end'
			onSubmit={onSubmitForm}
		>
			<input
				className='sm:grow sm:h-auto text-center h-2/5 border border-gray-300 rounded-md px-2'
				type='text'
				id='description'
				placeholder='Add new to do here.'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button
				type='submit'
				className='sm:grow sm:h-auto px-2 h-2/5 rounded-md bg-green-300 text-gray-600 font-bold'
			>
				Add
			</button>
		</form>
	);
};

export default InputTodo;
