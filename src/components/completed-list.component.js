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

	
	const listTitle = (() => {
		if (completedTodos.length > 0) {
			return (
				<div className="list-meta">
					<div className="list-title">Done</div>
					<div className="amount">{completedTodos.length}/{todos.length}</div>
				</div>
			);
		}

		return (<p><small>Finished tasks will display here.</small></p>);
	})();

	return (
		<div className="list-group-container">

			{listTitle}

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
