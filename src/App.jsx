import React, { useReducer, useRef } from 'react';
import './App.css'

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      const updatedTasks = state.tasks.map((task, index) =>
        index === action.payload ? 'The content is hidden' : task
      );
      return { tasks: updatedTasks };
    default:
      return state;
  }
};

const TaskManager = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const addTask = () => {
    const task = inputRef.current.value;
    if (task.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: task });
      inputRef.current.value = '';
    }
  };

  const toggleTask = (index) => {
    dispatch({ type: 'TOGGLE_TASK', payload: index });
  };

  return (
    <div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={addTask}>Add Task</button>
        <button onClick={() => inputRef.current.focus()}>Focus Input</button>
      </div>
      <ul>
        {state.tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => toggleTask(index)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
