// A lightweight mock API layer simulating server delays

const MOCK_AUTOMATIONS = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'create_jira', label: 'Create Jira Ticket', params: ['project', 'summary', 'description'] },
  { id: 'slack_notify', label: 'Notify Slack Channel', params: ['channel', 'message'] }
];

export const getAutomations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_AUTOMATIONS);
    }, 500); // 500ms network delay
  });
};

export const simulateWorkflow = (nodes, edges) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Basic Validation
        const startNodes = nodes.filter(n => n.type === 'start');
        if (startNodes.length === 0) {
          throw new Error("Workflow must have at least one Start Node.");
        }
        if (startNodes.length > 1) {
          throw new Error("Workflow can only have one Start Node.");
        }

        const startNode = startNodes[0];
        const executionLog = [];
        let currentNodeId = startNode.id;
        let step = 1;

        // Traverse the graph
        const visited = new Set();
        
        while (currentNodeId) {
          if (visited.has(currentNodeId)) {
            throw new Error("Cycle detected in the workflow graph. Simulation aborted.");
          }
          visited.add(currentNodeId);

          const node = nodes.find(n => n.id === currentNodeId);
          if (!node) break;

          let logMessage = `[Step ${step}] Executing ${node.type} node: "${node.data.title || node.id}"`;
          
          if (node.type === 'task') {
            logMessage += ` -> Assigned to ${node.data.assignee || 'Unassigned'}`;
          } else if (node.type === 'approval') {
            logMessage += ` -> Awaiting approval from ${node.data.approverRole || 'Manager'}`;
          } else if (node.type === 'automated') {
            logMessage += ` -> Triggering action: ${node.data.actionId || 'None'}`;
          } else if (node.type === 'end') {
            logMessage += ` -> Workflow Complete. Message: ${node.data.endMessage || 'None'}`;
          }
          
          executionLog.push(logMessage);

          // Find next node
          const outgoingEdges = edges.filter(e => e.source === currentNodeId);
          if (outgoingEdges.length === 0) {
             if (node.type !== 'end') {
               executionLog.push(`[Warning] Node "${node.data.title || node.id}" has no outgoing connections and is not an End Node.`);
             }
             break;
          }
          
          if (outgoingEdges.length > 1) {
            executionLog.push(`[Info] Multiple outgoing connections from "${node.data.title || node.id}". Simulating first path only for now.`);
          }

          currentNodeId = outgoingEdges[0].target;
          step++;
        }

        resolve({ success: true, log: executionLog });

      } catch (error) {
         resolve({ success: false, error: error.message });
      }
    }, 800);
  });
};
