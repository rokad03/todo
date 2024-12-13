import React, { useState } from 'react';

export default function CreateTodo({ setTodos }) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   const handleAddTodo = () => {
      fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
      })
      .then(async function(res) {
        const json = await res.json();
        alert("Todo Added");

        // Fetch todos again to update the list
        fetch("http://localhost:3000/todos")
          .then(async function (res) {
            const json = await res.json();
            setTodos(json.todos);
          });

      })
      .catch(err => console.log(err));
   };

  return (
    <div>
      <input id='title' style={{ padding: 10, margin: 10 }} type="text" placeholder='Title'
         onChange={(e) => setTitle(e.target.value)}
      /> <br /> <br />
      <input id='description' style={{ padding: 10, margin: 10 }} type="text" placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
      /> <br /> 

      <button style={{ padding: 10, margin: 35 }} onClick={handleAddTodo}>
        Add A Todo
      </button>
    </div>
  );
}
