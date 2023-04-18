import React, { useEffect, useState } from 'react';

const EditTodo = (ahh) => {
	if (ahh.open == false) {
		return null;
	}
	const [description, setDescription] = useState('todoInfo.description');
	const updateDesc = async (e) => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch(`/todos/${ahh.todoInfo.todo_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			ahh.upDList.toEdit();
			ahh.onClose();
		} catch (err) {
			console.error(err.message);
			setDescription(ahh.todoInfo.description);
		}
	};
	const handleCancel = (e) => {
		ahh.onClose();
	};

	useEffect(() => {
		setDescription(ahh.todoInfo.description);
	}, []);
	return (
		<div className='bg-slate-700 fixed flex top-0 left-0 right-0 bottom-0 items-center justify-center border bg-opacity-70 z-98'>
			<div className='h-full w-full items-center justify-center border border-red-700 z-99'>
				<div className='m-10 h-5/6 w-5/6 border '>
					<form
						onSubmit={updateDesc}
						className='flex flex-col  justify-between h-full w-full'
					>
						<input
							type='text'
							className='border h-4/6 text-center text-black border-gray-300 rounded-md px-2'
							placeholder='Where internet is going?'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<button
							type='submit'
							className='bg-green-300 h-1/6 text-gray-600 border font-bold rounded-md px-2'
						>
							Save
						</button>
						<button
							className='bg-green-300 h-1/6 text-gray-600 font-bold border rounded-md px-2'
							onClick={handleCancel}
						>
							Cancel
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditTodo;
