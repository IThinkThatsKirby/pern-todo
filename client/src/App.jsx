import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

function App() {
	return (
		<div className='App h-screen w-screen'>
			<ListTodo />
			<InputTodo />
		</div>
	);
}

export default App;
