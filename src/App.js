import React, { Component } from 'react';
const firebase = require('firebase');
const uuid = require('uuid');

const config = {
  apiKey: "AIzaSyDMqG7U1cWj-hhqDokEscbUHAqeVCY3q3E",
  authDomain: "rozzi-s-to-do-list.firebaseapp.com",
  databaseURL: "https://rozzi-s-to-do-list.firebaseio.com",
  projectId: "rozzi-s-to-do-list",
  storageBucket: "rozzi-s-to-do-list.appspot.com",
  messagingSenderId: "228783943614",
  appId: "1:228783943614:web:54bbf024f0dac6f1a093ef",
  measurementId: "G-NB11MD8V2F"
};
firebase.initializeApp(config);
// firebase.analytics();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: uuid.v1(),
      firstName: '',
      lastName: '',
    };
    this.submitData = this.submitData.bind(this);
    this.inputData = this.inputData.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`Newdata/${this.state.uid}`)
      .on('value', snap => console.log('from db', snap.val()));
  }

  submitData(event) {
    event.preventDefault();
    firebase
      .database()
      .ref(`Newdata/${this.state.uid}`)
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      })
      .catch(error => console.log(error));
  }

  inputData(event) {
    const firstName = this.refs.name1.value;
    const lastName = this.refs.last_name.value;
    this.setState({ firstName, lastName });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello</h1>
          <form onSubmit={this.submitData}>
            <label>
              Name:
              <input type="text" onChange={this.inputData} ref="name1" />
              Last Name:
              <input type="text" onChange={this.inputData} ref="last_name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
  

  
}

export default App;
