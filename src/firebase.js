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

export default firebase;