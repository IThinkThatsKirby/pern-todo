import React, { useState } from 'react';

import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

function App() {
	const [todos, getTodos] = useState(1);
	const upDateList = () => {
		getTodos(todos + 1);
	};
	return (
		<div className='App flex h-screen w-screen flex-col justify-between'>
			<ListTodo prop={todos} toEdit={upDateList} />
			<InputTodo onAddTodo={upDateList} />
		</div>
	);
}

export default App;
