import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, changeStateTodo } from "./todoSlice";
import "./index.css"; 

function App() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todosState);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      const newTodo = {
        id: Math.random(),
        text: inputRef.current.value,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      inputRef.current.value = "";
    } else {
      alert("Nimadir yozing");
    }
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <label>
          <span>Text:</span>
          <input type="text" ref={inputRef} className="todo-input" />
        </label>
        <button className="submit-button">Submit</button>
      </form>

      <ul className="todo-list">
        {todos.map((item) => {
          return (
            <li
              key={item.id}
              className={`todo-item ${item.completed ? "completed" : ""}`}
            >
              <div className="todo-item-content">
                <h4>{item.text}</h4>
              </div>
              <div className="todo-item-buttons">
                <button
                  onClick={() => dispatch(removeTodo(item.id))}
                  className="delete-button"
                >
                  Delete
                </button>
                <button
                  onClick={() => dispatch(changeStateTodo(item.id))}
                  className="done-button"
                >
                  Done
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
