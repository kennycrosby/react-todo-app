import React      from 'react';

const TodoForm = ({addTodo}) => {
	// Input tracker
	let input;

	return (
		<form className="add-todos" onSubmit={
				(e) => {
					e.preventDefault();
					
					if (input.value.length > 0) {
						addTodo(input.value);
						input.value = '';	
					}
				}
			}>
			<input className="form-control" placeholder="go to the dmv" ref={node => {
				input = node;
			}} />
			<button className="btn btn-primary" type="submit">
				+
			</button>
		</form>
	);
};

export default TodoForm;
