import { useState, useEffect } from 'react';
import './App.css';
import CreateTodo from './component/CreateTodo';
import Todos from './component/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async function (res) {
        const json = await res.json();
        setTodos(json.todos); 
      })
      .catch(err => console.log(err));
  }, []);

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
       <CreateTodo setTodos={setTodos} />
       <Todos todos={todos} onRemoveTodo={handleRemoveTodo} />
    </div>
  );
}

export default App;
