import React, { useState, useEffect } from "react";
import "./App.css";
import ChangeButton from "./components/ChangeButton";
import DeleteButton from "./components/DeleteButton";
import CompleteButton from "./components/CompleteButton";
import AddButton from "./components/AddButton";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="addTodo">
      <input
        type="text"
        className="addTodoInput"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <AddButton onClick={() => handleSubmit} />
    </form>
  );
}

function App() {
  useEffect(() => {
    document.title = "Todos";
  }, []);

  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodos = [
      ...todos,
      {
        text,
        isCompleted: false,
        editing: false
      }
    ];
    setTodos(newTodos);
  };

  const handleCompleted = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleDelete = index => {
    const newTodos = todos.filter((todo, idx) => idx !== index);
    setTodos(newTodos);
  };

  const handleChange = index => {
    const newTodos = [...todos];
    newTodos[index].editing = !newTodos[index].editing;
    setTodos(newTodos);
  };

  const submitChange = index => {
    const newTodos = [...todos];
    newTodos[index].editing = !newTodos[index].editing;
    setTodos(newTodos);
  };

  const handleSubmitChange = (event, index) => {
    const newTodos = [...todos];
    newTodos[index].text = event.target.value;
    setTodos(newTodos);
  };

  const toggleAll = () => {
    let completedTodos = 0;

    todos.forEach(todo => {
      if (todo.isCompleted === true) {
        completedTodos++;
      }
    });

    const newTodos = [...todos];

    newTodos.forEach(todo => {
      if (completedTodos === newTodos.length) {
        todo.isCompleted = false;
      } else {
        todo.isCompleted = true;
      }
    });
    setTodos(newTodos);
  };

  return (
    <main className="whiteBox">
      <div className="line one"></div>
      <div className="line two"></div>
      <div className="line three"></div>

      <div className="leftContainer">
        <h3>Todos</h3>
        <div className="addTodo">
          <TodoForm addTodo={addTodo} />
        </div>
      </div>

      <div className="rightContainer">
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo">
              {todo.editing ? (
                <input
                  placeholder="Add Todo"
                  type="text"
                  value={todo.text}
                  className="submitInput"
                  onChange={e => handleSubmitChange(e, index)}
                />
              ) : (
                <li
                  style={{
                    textDecorationLine: todo.isCompleted ? "line-through" : ""
                  }}
                >
                  {todo.text}
                </li>
              )}
              <div className="todoButtons">
                {!todo.editing && (
                  <DeleteButton onClick={() => handleDelete(index)} />
                )}

                {todo.editing ? (
                  <button
                    onClick={() => submitChange(index)}
                    className="submitButton"
                  >
                    Submit
                  </button>
                ) : (
                  <ChangeButton onClick={() => handleChange(index)} />
                )}

                {!todo.editing && (
                  <CompleteButton onClick={() => handleCompleted(index)} />
                )}
              </div>
            </li>
          ))}

          <div
            className="toggleAll"
            style={todos.length !== 0 ? {} : { display: "none" }}
          >
            <h4 onClick={() => toggleAll()}>Complete All</h4>
            <CompleteButton onClick={() => toggleAll()} />
          </div>
        </ul>
      </div>
    </main>
  );
}

export default App;
