import React      from 'react';
import iconCheck      from '../images/check.svg';
import iconDelete      from '../images/delete.svg';

const Todo = ({todo, remove, completed}) => {

	const todoItem = () => {
		if (completed) {
			return (
				
				<button className="todo-item completed" onClick={() => { remove(todo.key); } }>
					<div className="bg-container">
						<div className="checkbox">
							<div className="hover-delete">
								<img className="icon-delete" src={iconDelete} />
								<img className="icon-check" src={iconCheck} />
							</div>
						</div>
						<div className="title"><s>{todo.text}</s></div>
					</div>
				</button>

			);
		}
		
		return (
			<button className="todo-item" onClick={() => { remove(todo.key); } }>
				<div className="bg-container">
					<div className="checkbox">
						<div className="hover-checkbox">
							<img className="icon-check" src={iconCheck} />
						</div>
					</div>
					<div className="title">{todo.text}</div>
				</div>
			</button>
		);
	}

	// Each Todo
	return todoItem();
}

export default Todo;
