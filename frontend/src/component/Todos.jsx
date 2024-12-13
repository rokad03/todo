import React from 'react';

export default function Todos({ todos, onRemoveTodo }) {
    return (
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button onClick={() => onRemoveTodo(index)}>
              {todo.completed === true ? "Completed" : "Mark as Completed"}
            </button>
          </div>
        ))}
      </div>
    );
}
