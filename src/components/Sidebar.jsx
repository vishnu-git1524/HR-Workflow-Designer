import React from 'react';
import { PlayCircle, ClipboardList, UserCheck, Zap, CheckCircle } from 'lucide-react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <h2>Workflow Nodes</h2>
      <p style={{ marginBottom: '1rem' }}>Drag and drop nodes to build your workflow.</p>
      
      <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'start')} draggable>
        <PlayCircle size={18} color="var(--color-node-start-border)" />
        Start Node
      </div>
      <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'task')} draggable>
        <ClipboardList size={18} color="var(--color-node-task-border)" />
        Task Node
      </div>
      <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'approval')} draggable>
        <UserCheck size={18} color="var(--color-node-approval-border)" />
        Approval Node
      </div>
      <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'automated')} draggable>
        <Zap size={18} color="var(--color-node-automated-border)" />
        Automated Action
      </div>
      <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'end')} draggable>
        <CheckCircle size={18} color="var(--color-node-end-border)" />
        End Node
      </div>
    </div>
  );
};

export default Sidebar;
