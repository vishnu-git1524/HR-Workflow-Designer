import React from 'react';
import { Handle, Position } from 'reactflow';
import { PlayCircle } from 'lucide-react';

const StartNode = ({ data, selected }) => {
  return (
    <div className={`custom-node start-node ${selected ? 'selected' : ''}`}>
      <div className="custom-node-header">
        <PlayCircle size={16} color="var(--color-node-start-border)" />
        {data.title || 'Start'}
      </div>
      <div className="custom-node-content">
        Initiates the workflow.
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default StartNode;
