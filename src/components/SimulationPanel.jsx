import React, { useState } from 'react';
import useWorkflowStore from '../store/workflowStore';
import { simulateWorkflow } from '../api/mockApi';

const SimulationPanel = () => {
  const { nodes, edges } = useWorkflowStore();
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSimulate = async () => {
    setIsRunning(true);
    setResult(null);
    setIsOpen(true);
    
    const response = await simulateWorkflow(nodes, edges);
    setResult(response);
    setIsRunning(false);
  };

  return (
    <>
      <button 
        className="premium-btn" 
        style={{ position: 'absolute', top: '1rem', right: '320px', zIndex: 10 }}
        onClick={handleSimulate}
        disabled={isRunning}
      >
        {isRunning ? 'Simulating...' : 'Test Workflow'}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '250px',
          right: '300px',
          height: '250px',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0.5rem 1rem', 
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-secondary)'
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Simulation Sandbox</h3>
            <button style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {isRunning && <div>Running simulation...</div>}
            
            {result && result.success === false && (
              <div style={{ color: 'var(--color-error)' }}>
                <strong>Error: </strong> {result.error}
              </div>
            )}
            
            {result && result.success && (
              <div>
                <strong style={{ color: 'var(--color-success)', display: 'block', marginBottom: '0.5rem' }}>
                  ✓ Simulation completed successfully
                </strong>
                {result.log.map((entry, i) => (
                  <div key={i} style={{ marginBottom: '4px', paddingLeft: '8px', borderLeft: '2px solid var(--color-primary)' }}>
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SimulationPanel;
