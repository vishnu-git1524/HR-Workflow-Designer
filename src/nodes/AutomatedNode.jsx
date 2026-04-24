import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap } from 'lucide-react';

const AutomatedNode = ({ data, selected }) => {
  return (
    <div className={`custom-node automated-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="custom-node-header">
        <Zap size={16} color="var(--color-node-automated-border)" />
        {data.title || 'Automated Action'}
      </div>
      <div className="custom-node-content">
        <div>Action: {data.actionId || 'None Selected'}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default AutomatedNode;
