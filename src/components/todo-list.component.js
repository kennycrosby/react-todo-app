import React   from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Todo                   from '../components/todo.component';

const TodoList = ({todos, remove}) => {
	
	// Map through the todos
	const todoNode = todos.map((todo) => {
		if (!todo.completed) {
			return (<Todo todo={todo} key={todo.key} remove={remove} isCompleted={todo.completed} />);
		}

		return undefined;
	});

	const toBeCompleted = todos.filter((todo) => {
		if (todo.completed === false) return todo;

		return undefined;
	});

	const listTitle = (() => {
		if (toBeCompleted.length > 0) {
			return (
				<div className="list-meta">
					<div className="list-title">To Do</div>
					<div className="amount">{toBeCompleted.length}</div>
				</div>
			);
		}

		return (<p><small>Add some shit to get done.</small></p>);
	})();

	return (
		<div className="list-group-container">
			{listTitle}
			<CSSTransitionGroup 
				transitionName="todo-item"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				className="list-group">
				{todoNode}
			</CSSTransitionGroup>
		</div>
	);
}

export default TodoList;
