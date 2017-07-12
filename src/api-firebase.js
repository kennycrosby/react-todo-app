import * as firebase from "firebase";

var config = {
		apiKey: "AIzaSyCyKCrWs7Gi1zic7sD7v0L2y9Op34VL6UE",
		authDomain: "todoapp-2ff9a.firebaseapp.com",
		databaseURL: "https://todoapp-2ff9a.firebaseio.com",
		projectId: "todoapp-2ff9a",
		storageBucket: "todoapp-2ff9a.appspot.com",
		messagingSenderId: "199095878343"
};

firebase.initializeApp(config);

export default class FirebaseAPI {

	constructor() {
			
		// Store a refernece to the todos object in the database
		this.todosRef = firebase.database().ref('todos');

	}

	// return array of values from firebase database
	getTodos(callback) {

		this.todosRef.on('value', (snapshot) => {
			
			let todosArr = [];

			// Create an array from the firebase object
			snapshot.forEach((item) => {
		        let itemVal = item.val();
		        itemVal.key = item.key;
		        todosArr.push(itemVal);
		    });

		    callback(todosArr);

		});

	}

	addTodo(todoItem, callback) {

		// Push to firebase
	    this.todosRef.push(todoItem, () => {
	    	// callback
	    	callback();
	    });

	}

	markTodoCompleted(key, item, callback) {

		firebase.database().ref('todos/' + key).set({
		    completed: true,
		    text: item.text,
			createdAt: new Date().getTime(),
			desc: item.desc || 'Just do it.'
		}, () => {
			console.log('callback?');
			callback();
		});

	}

	deleteTodoItemByKey(key, callback) {
		let fbTodoItem = this.todosRef.child(key);

		fbTodoItem.remove((snapshot) => {
			callback();
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



}

