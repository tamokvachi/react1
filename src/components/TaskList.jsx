import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks = [], onToggle }) {
  return (
    <div className="task-list">
      <h3>ფილმების სია ({tasks.length})</h3>
      <ul>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}
