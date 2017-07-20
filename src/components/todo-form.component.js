import React      from 'react';
import arrow from '../assets/images/arr.svg';

const TodoForm = ({addTodo}) => {
	// Input tracker
	let input;

	return (
		<div className="add-todos-container">
			<form className="add-todos" onSubmit={
					(e) => {
						e.preventDefault();

						if (input.value.length > 0) {
							addTodo(input.value);
							input.value = '';
						}
					}
				}>
				<input className="form-control" placeholder="add a to do" ref={node => {
					input = node;
				}} />
				<button className="btn btn-primary" type="submit">
					+
				</button>

				<img className="arrow" src={arrow} />

			</form>
			<div className="add-todos-prompt">Hit enter to add.</div>
		</div>
	);
};

export default TodoForm;
