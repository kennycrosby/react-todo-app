import React   from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Todo                   from '../components/todo.component';

const CompletedList = ({todos, remove}) => {
	// Map through the todos
	const todoNode = todos.map((todo) => {
		if (todo.completed) return (<Todo todo={todo} key={todo.key} remove={remove} completed={todo.completed} />);

		return undefined;
	});

	const completedTodos = todos.filter((todo) => {
		if (todo.completed === true) return todo;

		return undefined;
	});

	return (
		<div className="thingsToDo">
			<h1>Done! ({completedTodos.length})</h1>

			<CSSTransitionGroup 
				transitionName="todo-item"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				className="list-group completed-list">
				{todoNode}
			</CSSTransitionGroup>

		</div>
	);
}

export default CompletedList;
