import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({tasks,removeTask,editTask}) {
  return (
    <div className="container">
      <h3 className="text-center text-primary">Todos List</h3>
      <ul>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} removeTask={removeTask} editTask={editTask} />
      ))}
    </ul>

    </div>
  );
}
