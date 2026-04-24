import React, { useEffect, useState } from 'react';
import useWorkflowStore from '../store/workflowStore';
import { getAutomations } from '../api/mockApi';

const StartNodeForm = ({ node, onChange }) => (
  <>
    <div className="form-group">
      <label>Title</label>
      <input 
        className="premium-input" 
        value={node.data.title || ''} 
        onChange={(e) => onChange('title', e.target.value)} 
        placeholder="Start"
      />
    </div>
  </>
);

const TaskNodeForm = ({ node, onChange }) => (
  <>
    <div className="form-group">
      <label>Title *</label>
      <input 
        className="premium-input" 
        value={node.data.title || ''} 
        onChange={(e) => onChange('title', e.target.value)} 
        placeholder="Task Title"
        required
      />
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea 
        className="premium-input" 
        value={node.data.description || ''} 
        onChange={(e) => onChange('description', e.target.value)} 
        rows={3}
      />
    </div>
    <div className="form-group">
      <label>Assignee</label>
      <input 
        className="premium-input" 
        value={node.data.assignee || ''} 
        onChange={(e) => onChange('assignee', e.target.value)} 
        placeholder="e.g., HR Team"
      />
    </div>
    <div className="form-group">
      <label>Due Date</label>
      <input 
        className="premium-input" 
        type="date"
        value={node.data.dueDate || ''} 
        onChange={(e) => onChange('dueDate', e.target.value)} 
      />
    </div>
  </>
);

const ApprovalNodeForm = ({ node, onChange }) => (
  <>
    <div className="form-group">
      <label>Title</label>
      <input 
        className="premium-input" 
        value={node.data.title || ''} 
        onChange={(e) => onChange('title', e.target.value)} 
        placeholder="Manager Approval"
      />
    </div>
    <div className="form-group">
      <label>Approver Role</label>
      <select 
        className="premium-input"
        value={node.data.approverRole || ''}
        onChange={(e) => onChange('approverRole', e.target.value)}
      >
        <option value="">Select Role...</option>
        <option value="Manager">Manager</option>
        <option value="HRBP">HRBP</option>
        <option value="Director">Director</option>
      </select>
    </div>
    <div className="form-group">
      <label>Auto-Approve Threshold (Days)</label>
      <input 
        className="premium-input" 
        type="number"
        value={node.data.autoApproveThreshold || ''} 
        onChange={(e) => onChange('autoApproveThreshold', Number(e.target.value))} 
      />
    </div>
  </>
);

const AutomatedNodeForm = ({ node, onChange }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getAutomations().then(setActions);
  }, []);

  return (
    <>
      <div className="form-group">
        <label>Title</label>
        <input 
          className="premium-input" 
          value={node.data.title || ''} 
          onChange={(e) => onChange('title', e.target.value)} 
          placeholder="System Action"
        />
      </div>
      <div className="form-group">
        <label>Action</label>
        <select 
          className="premium-input"
          value={node.data.actionId || ''}
          onChange={(e) => onChange('actionId', e.target.value)}
        >
          <option value="">Select Action...</option>
          {actions.map(a => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

const EndNodeForm = ({ node, onChange }) => (
  <>
    <div className="form-group">
      <label>Title</label>
      <input 
        className="premium-input" 
        value={node.data.title || ''} 
        onChange={(e) => onChange('title', e.target.value)} 
        placeholder="End"
      />
    </div>
    <div className="form-group">
      <label>End Message</label>
      <input 
        className="premium-input" 
        value={node.data.endMessage || ''} 
        onChange={(e) => onChange('endMessage', e.target.value)} 
      />
    </div>
    <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
      <input 
        type="checkbox"
        checked={!!node.data.summaryFlag} 
        onChange={(e) => onChange('summaryFlag', e.target.checked)} 
        id="summaryFlag"
      />
      <label htmlFor="summaryFlag" style={{ marginBottom: 0 }}>Generate Summary Report</label>
    </div>
  </>
);

const NodeFormsPanel = () => {
  const selectedNode = useWorkflowStore(state => state.selectedNode);
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);

  if (!selectedNode) {
    return (
      <div className="properties-panel">
        <h3>Properties</h3>
        <p>Select a node to edit its configuration.</p>
      </div>
    );
  }

  const handleDataChange = (key, value) => {
    updateNodeData(selectedNode.id, { [key]: value });
  };

  return (
    <div className="properties-panel">
      <h3>{selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Node Configuration</h3>
      <div style={{ marginTop: '1rem' }}>
        {selectedNode.type === 'start' && <StartNodeForm node={selectedNode} onChange={handleDataChange} />}
        {selectedNode.type === 'task' && <TaskNodeForm node={selectedNode} onChange={handleDataChange} />}
        {selectedNode.type === 'approval' && <ApprovalNodeForm node={selectedNode} onChange={handleDataChange} />}
        {selectedNode.type === 'automated' && <AutomatedNodeForm node={selectedNode} onChange={handleDataChange} />}
        {selectedNode.type === 'end' && <EndNodeForm node={selectedNode} onChange={handleDataChange} />}
      </div>
    </div>
  );
};

export default NodeFormsPanel;
