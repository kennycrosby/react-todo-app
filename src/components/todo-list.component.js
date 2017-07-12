import React   from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Todo                   from '../components/todo.component';

const TodoList = ({todos, remove}) => {
	
	// Map through the todos
	const todoNode = todos.map((todo) => {
		if (!todo.completed) {
			return (<Todo todo={todo} key={todo.key} remove={remove} completed={todo.completed} />);
		}

		return undefined;
	});

	const toBeCompleted = todos.filter((todo) => {
		if (todo.completed === false) return todo;

		return undefined;
	});

	return (
		<div className="thingsToDo">
			<h1>Things to do ({toBeCompleted.length})</h1>
			<CSSTransitionGroup 
				transitionName="todo-item"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
				className="list-group">
				{todoNode}
			</CSSTransitionGroup>
		</div>
	);
}

export default TodoList;
