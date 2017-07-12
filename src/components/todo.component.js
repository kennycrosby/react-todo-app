import React      from 'react';

const Todo = ({todo, remove, completed}) => {

	const todoItem = () => {
		if (completed) {
			return (<button className="todo-item completed" onClick={() => { remove(todo.key); } }><s>{todo.text}</s></button>);
		}
		
		return (<button className="todo-item" onClick={() => { remove(todo.key); } }>{todo.text}</button>);
	}

	// Each Todo
	return todoItem();
}

export default Todo;
