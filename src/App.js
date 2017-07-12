import React, { Component }      from 'react';
import firebase                  from './firebase';
import { CSSTransitionGroup } from 'react-transition-group';


import logo from './logo.svg';
import './App.css';


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

const Todo = ({todo, remove, completed}) => {

	const todoItem = () => {
		if (completed) {
			return (<a href="#" className="todo-item completed" onClick={() => { remove(todo.key); } }><s>{todo.text}</s></a>);
		} else {
			return (<a href="#" className="todo-item" onClick={() => { remove(todo.key); } }>{todo.text}</a>);
		}
	}

	// Each Todo
	return todoItem();
}

const TodoList = ({todos, remove}) => {
	// Map through the todos
	const todoNode = todos.map((todo) => {
		if (!todo.completed) {
			return (<Todo todo={todo} key={todo.key} remove={remove} completed={todo.completed} />);
		}
	});

	const toBeCompleted = todos.filter((todo) => {
		if (todo.completed == false) return todo;
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

const CompletedList = ({todos, remove}) => {
	// Map through the todos
	const todoNode = todos.map((todo) => {
		if (todo.completed) return (<Todo todo={todo} key={todo.key} remove={remove} completed={todo.completed} />)
	});

	const completedTodos = todos.filter((todo) => {
		if (todo.completed == true) return todo;
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

		this.todosRef = firebase.database().ref('todos');

	}
	
	componentDidMount(){

		this.todosRef.on('value', (snapshot) => {
			
			let todos = snapshot.val();
			let todosArr = [];

			// Create an array from the firebase object
			snapshot.forEach((item) => {
		        let itemVal = item.val();
		        itemVal.key = item.key;
		        todosArr.push(itemVal);
		    });

			this.setState({
				data: todosArr
			});

			// this.animate();

		});

		

	}

	animate() {

		let transitionDelay = 0;

		setTimeout( () => {

			let todoItems = document.querySelectorAll('.todo-item');

			for(let i=0; i < todoItems.length; i++) {
				transitionDelay += .08;
				todoItems[i].style.transitionDelay = `${transitionDelay}s`;
				todoItems[i].classList.add('in');
			}

		}, 1000);

		
	}
	
	// Add todo handler
	addTodo(val, desc){
		
		// Assemble data
		const todo = {
			text: val,
			createdAt: new Date().getTime(),
			completed: false,
			desc: desc || 'Just do it.'
		}

		// Push to firebase
	    this.todosRef.push(todo, () => {
	    	// callback
	    });

	    // Update app state
		this.state.data.push(todo);
		
	}

	markCompletedFB(key, item) {

		firebase.database().ref('todos/' + key).set({
		    completed: true,
		    text: item.text,
			createdAt: new Date().getTime(),
			desc: item.desc || 'Just do it.'
		}, () => {
			console.log('callback?');
		});

	}

	getItemByKey(key, callback) {

		let fbTodoItem = this.todosRef.child(key);

		fbTodoItem.once('value', (snapshot) => {
			console.log(snapshot.val());
			let item = snapshot.val();

			callback(item);
			
		});

	}

	deleteItemByKey(key, callback) {
		let fbTodoItem = this.todosRef.child(key);

		fbTodoItem.remove((snapshot) => {
			callback();
		});
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

		this.markCompletedFB(key, item);

		this.setState({
			data: updatedItems
		});

	}

	removeFromDb(key) {

		// in the future, ask if user is sure they want to remove the item

		this.deleteItemByKey(key, () => {
			console.log('done removing');
		});

		// Filter all todos except the one to be removed
		const remainder = this.state.data.filter((todo) => {
			if(todo.key !== key) return todo;
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
					remove={this.removeFromDb.bind(this)}
				/>

			</div>
		);
	}
}


export default TodoApp;
