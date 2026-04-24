import React from 'react';
import { Handle, Position } from 'reactflow';
import { ClipboardList } from 'lucide-react';

const TaskNode = ({ data, selected }) => {
  return (
    <div className={`custom-node task-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="custom-node-header">
        <ClipboardList size={16} color="var(--color-node-task-border)" />
        {data.title || 'Task'}
      </div>
      <div className="custom-node-content">
        <div>Assignee: {data.assignee || 'Unassigned'}</div>
        {data.dueDate && <div>Due: {data.dueDate}</div>}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TaskNode;
