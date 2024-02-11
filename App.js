import "./App.css";
import { useState } from "react";
import Header from "./Project/Header";
import TodoList from "./Project/TodoList";
import Bookapi from "./API/Bookapi";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = (task) => {
    if (editingTaskId !== null) {
      setTasks(tasks.map(t => (t.id === editingTaskId ? { ...t, text: task.text } : t)));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, { id: tasks.length + 1, text: task.text, date: new Date() }]);
    }
    setNewTask('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit);
    setEditingTaskId(id);
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, text: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
  };

  return (
    <>
      <Header title="MY TODOS LIST" />
      <TodoList tasks={tasks} removeTask={removeTask} editTask={editTask} />
      <div className="container mx-10 align-items-center"style={{display:'flex',justifyContent:'center'}}>
        <form onSubmit={handleFormSubmit}>
           <input className="border border-success text-center"
            type="text"
            placeholder="Add a new task"
            value={newTask.text || ''}
            onChange={handleInputChange}
          />
          <button className="btn btn-success btn-sm mx-3" type="submit">
            {editingTaskId !== null ? 'Edit Task' : 'Add Task'}
          </button>
        </form>
      </div>
      <Bookapi/>
      {/* <ApiData/> */}
    </>
  );
}
