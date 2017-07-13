import React      from 'react';

const Todo = ({todo, remove, completed}) => {

	const todoItem = () => {
		if (completed) {
			return (
				
				<button className="todo-item completed" onClick={() => { remove(todo.key); } }>
					<h5 className="title"><s>{todo.text}</s></h5>
				</button>

			);
		}
		
		return (
			<button className="todo-item" onClick={() => { remove(todo.key); } }>
				<h5 className="title">{todo.text}</h5>
			</button>
		);
	}

	// Each Todo
	return todoItem();
}

export default Todo;
