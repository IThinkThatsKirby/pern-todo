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
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<form
			className='absolute h-1/6 justify-center flex flex-row flex-nowrap inset-x-0 bottom-0'
			onSubmit={onSubmitForm}
		>
			<lable for='description'>New todo:</lable>
			<input
				type='text'
				id='description'
				placeholder='Add new to do here.'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button
				type='submit'
				className='px-2 rounded-md bg-green-300 text-gray-600 font-bold'
			>
				Add
			</button>
		</form>
	);
};

export default InputTodo;
