import React from 'react';

export default function TaskCard({ task, onToggle }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  return (
    <li className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <span className="task-icon">{task.completed ? '✅' : '⏳'}</span>
        <span className="task-title">{task.title}</span>
      </div>

      <button 
        type="button" 
        className="toggle-btn"
        onClick={handleClick}
        title={task.completed ? "სტატუსის დაბრუნება" : "მონიშვნა და ფილმების სიაზე გადასვლა"}
      >
        {task.completed ? 'დაბრუნება' : ' მონიშვნა ↓'}
      </button>
    </li>
  );
}
