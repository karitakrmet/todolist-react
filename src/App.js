import React from 'react';
import './App.css';
import ChangeButton from './components/ChangeButton';
import DeleteButton from './components/DeleteButton';
import CompleteButton from './components/CompleteButton';
import AddButton from './components/AddButton';


class App extends React.Component {

  state = {
    todoItem: '',
    todos: []
  }

  handleChange = event => {
    this.setState({ todoItem: event.target.value })
  }

  handleSubmit = () => {
    if(this.state.todoItem.length > 0) {
      this.setState(prevState => {
  
        const lastTodo = prevState.todos[prevState.todos.length - 1];
        const todos = [
          ...prevState.todos,
          {
            // TODO: implement proper id ordering for todos
            id: prevState.todos.length === 0 ? 0 : lastTodo.id + 1,
            text: this.state.todoItem,
            completed: false,
            editing: false,
          }
        ];
        return {
          todos,
          todoItem: '',
        }
      })      
    }
  }

  deleteTodo = (i) => {
    const newTodos = this.state.todos.filter((todo, idx) => idx !== i);
    this.setState({ todos: newTodos })
  }

  handleCompleted = (i) => {
    const newTodos = [...this.state.todos];
    newTodos[i].completed = !newTodos[i].completed;
    this.setState({ todos: newTodos })
  }

  changeTodo = (i) => {
    const newTodos = [...this.state.todos];
    newTodos[i].editing = !newTodos[i].editing;
    this.setState({ todos: newTodos })
  }

  handleSubmitChange = (event, i) => {

    const newTodos = [...this.state.todos];
    newTodos[i].text = event.target.value;
    this.setState({ todos: newTodos });
  }

  submitChange = (i) => {
    const newTodos = [...this.state.todos];
    newTodos[i].editing = !newTodos[i].editing;

    this.setState({ todos: newTodos })
  }

  toggleAll = () => {
    let completedTodos = 0;

    this.state.todos.forEach(todo => {
      if (todo.completed === true) { completedTodos++ }
      console.log(completedTodos)
    })

    const newTodos = [...this.state.todos];

    newTodos.forEach(todo => {
      if (completedTodos === newTodos.length) {
        todo.completed = false
      } else {
        todo.completed = true
      }
    })

    this.setState({ todos: newTodos })

  }

  render() {
    return (

      <div className='whiteBox'>
        
        <div className='line one'></div>
        <div className='line two'></div>
        <div className='line three'></div>

        <div className='leftContainer'>
          <h3>Todos</h3>
          <div className='addTodo'>
            <input autoFocus placeholder='Type your todo here' type='text' onChange={this.handleChange} value={this.state.todoItem} className='addTodoInput' />
            <AddButton onClick={this.handleSubmit} />
          </div>
        </div>

        <div className='rightContainer'>
          <ul>
            {this.state.todos.map((todo, i) => (

              <div key={todo.id} className='todo'>

                {todo.editing
                  ? <input placeholder='Add Todo' type='text' value={todo.text} className='submitInput' onChange={e => this.handleSubmitChange(e, i)} />
                  : <li style={{ textDecorationLine: todo.completed ? 'line-through' : '' }}>{todo.text}</li>
                }
                <div className='todoButtons'>

                  {!todo.editing && <DeleteButton onClick={() => this.deleteTodo(i)} />}

                  {todo.editing
                    ? <button onClick={() => this.submitChange(i)} className="submitButton">Submit</button>
                    : <ChangeButton
                      onClick={() => this.changeTodo(i)}
                    />
                  }

                  {!todo.editing && <CompleteButton onClick={() => this.handleCompleted(i)} />}
                </div>
              </div>

            ))}

            <div className='toggleAll' style={this.state.todos.length !== 0 ? {} : { display: 'none' }}>
              <h4 onClick={() => this.toggleAll()}>Complete All</h4>
              <CompleteButton onClick={() => this.toggleAll()} />

            </div>

          </ul>
        </div>
      </div>

    )
  }
}

export default App;
