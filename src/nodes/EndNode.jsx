import React from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCircle } from 'lucide-react';

const EndNode = ({ data, selected }) => {
  return (
    <div className={`custom-node end-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="custom-node-header">
        <CheckCircle size={16} color="var(--color-node-end-border)" />
        {data.title || 'End'}
      </div>
      <div className="custom-node-content">
        {data.endMessage && <div>Msg: {data.endMessage}</div>}
        {data.summaryFlag && <div>Summary Enabled</div>}
      </div>
    </div>
  );
};

export default EndNode;
