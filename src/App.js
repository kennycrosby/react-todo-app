import React, { Component }      from 'react';
import FirebaseAPI               from './api-firebase';

// Components 
import TodoForm       from './components/todo-form.component';
import TodoList       from './components/todo-list.component';
import CompletedList  from './components/completed-list.component';

import './App.css';


// Contaner Component
class TodoApp extends React.Component{
	constructor(props){

		// Pass props to parent class
		super(props);

		// Set initial state
		this.state = {
			data: [],
			todoitems: [],
			completeditems: []
		}

		this.firebaseAPI = new FirebaseAPI();

	}
	
	componentDidMount(){

		this.firebaseAPI.getTodos( (todosArr) => {

			this.setState({
				data: todosArr
			});
		});

	}

	// animate() {

	// 	let transitionDelay = 0;

	// 	setTimeout( () => {

	// 		let todoItems = document.querySelectorAll('.todo-item');

	// 		for(let i=0; i < todoItems.length; i++) {
	// 			transitionDelay += .08;
	// 			todoItems[i].style.transitionDelay = `${transitionDelay}s`;
	// 			todoItems[i].classList.add('in');
	// 		}

	// 	}, 1000);

		
	// }
	
	// Add todo handler
	addTodo(val, desc){
		
		// Assemble data
		const todo = {
			text: val,
			createdAt: new Date().getTime(),
			completed: false,
			desc: desc || 'Just do it.'
		}

		this.firebaseAPI.addTodo(todo, () => {
	    	// callback
	    });

	    // Update app state
		this.state.data.push(todo);
		
	}

	// Mark todo item as completed
	markCompleted(key){

		let item = {};

		const updatedItems = this.state.data.filter((todo) => {
		
			if(todo.key === key) {
				item = todo;
				todo.completed = true;
			}

			return todo;
		});

		this.firebaseAPI.markTodoCompleted(key, item, () => {
			// callback
		});

		this.setState({
			data: updatedItems
		});

	}

	deleteTodoItem(key) {

		// in the future, ask if user is sure they want to remove the item
		this.firebaseAPI.deleteTodoItemByKey(key, () => {
			// callback
		});

		// Filter all todos except the one to be removed
		const remainder = this.state.data.filter((todo) => {
			if(todo.key !== key) return todo;

			return undefined;
		});

		this.setState({data: remainder});
		
	}

	render(){


		// Render JSX
		return (
			<div>
				
				<TodoForm addTodo={this.addTodo.bind(this)}/>
				
				<TodoList 
					todos={this.state.data} 
					remove={this.markCompleted.bind(this)}
				/>
				
				<CompletedList
					todos={this.state.data} 
					remove={this.deleteTodoItem.bind(this)}
				/>

			</div>
		);
	}
}


export default TodoApp;
