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
			className='h-2/5 flex flex-col sm:flex-row sm:w-full sm:justify-center justify-end sm:fixed sm:bottom-0 sm:items-center'
			onSubmit={onSubmitForm}
		>
			<input
				className='sm:grow h-full text-center border border-gray-300 rounded-md px-2'
				type='text'
				id='description'
				placeholder='Add new to do here.'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button
				type='submit'
				className='sm:grow h-full px-2 rounded-md bg-green-300 text-gray-600 font-bold'
			>
				Add
			</button>
		</form>
	);
};

export default InputTodo;
