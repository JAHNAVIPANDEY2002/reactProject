import React from "react";

export default function TodoItem({ task, removeTask, editTask }) {
  const date = new Date(task.date);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="container mx-10">
      <div className="d-flex justify-content-between align-items-center border border-info">
        <div>
        <div className="form-check form-switch ml-2 my-2">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <p className="text-success ml-2 my-2">{task.text}</p>
</div>

          <p className="text-secondary ml-2 my-2">{formattedDate}</p>
        </div>
        <div>
          <button className="btn btn-danger btn-sm mx-2" onClick={() => removeTask(task.id)}>
            Remove
          </button>
          <button className="btn btn-warning btn-sm mr-2" onClick={() => editTask(task.id)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

