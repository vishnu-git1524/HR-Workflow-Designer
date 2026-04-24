import React from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import NodeFormsPanel from './components/NodeForms';
import SimulationPanel from './components/SimulationPanel';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div style={{ flex: 1, position: 'relative' }}>
        <WorkflowCanvas />
        <SimulationPanel />
      </div>
      <NodeFormsPanel />
    </div>
  );
}

export default App;
