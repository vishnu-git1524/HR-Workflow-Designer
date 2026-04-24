import React from 'react';
import { Handle, Position } from 'reactflow';
import { UserCheck } from 'lucide-react';

const ApprovalNode = ({ data, selected }) => {
  return (
    <div className={`custom-node approval-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="custom-node-header">
        <UserCheck size={16} color="var(--color-node-approval-border)" />
        {data.title || 'Approval'}
      </div>
      <div className="custom-node-content">
        <div>Role: {data.approverRole || 'Manager'}</div>
        {data.autoApproveThreshold && <div>Auto-Approve: {data.autoApproveThreshold}</div>}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default ApprovalNode;
