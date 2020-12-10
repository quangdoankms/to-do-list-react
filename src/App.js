import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import Clock from './components/Clock';
import About from './components/pages/About';
import './App.css';
// import { v4 as uuid } from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
      res => this.setState({ todos: res.data })
    );
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    })
  }

  // deleteItem = (id) => {
  //   this.setState({
  //     todos: [...this.state.todos.filter(todo => todo.id !== id)]
  //   });
  // }

  deleteItem = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
      res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    );
  }

  // addTodo = (title) => {
  //   const newTodo = {
  //     id: uuid(),
  //     title,
  //     completed: false
  //   }

  //   this.setState({
  //     todos: [...this.state.todos, newTodo]
  //   });
  // }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title, 
      completed: false
    }).then(
      res => this.setState({todos: [...this.state.todos, res.data]})
    );
  }

  tick = () => {
    date: new Date()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Header />
            <Clock tick={this.tick}/>
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                  deleteItem={this.deleteItem} />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
