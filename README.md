# HR Workflow Designer Prototype

A React-based visual workflow designer for HR administrators to create and test internal workflows. Built using React Flow, Zustand, and standard CSS to achieve a premium, flexible design.

## Architecture & Design Choices

1. **State Management (Zustand)**
   We use Zustand (`src/store/workflowStore.js`) for global state management. This is crucial for applications like node editors where multiple disparate components (the canvas, the configuration panel, the simulation sandbox) need real-time access to the graph's nodes, edges, and selection state without heavy prop drilling or complex context re-renders.

2. **Component Separation**
   - `WorkflowCanvas`: Handles only the React Flow instantiation, drag-and-drop logic, and rendering of the graph.
   - `Sidebar`: A stateless component providing draggable node templates.
   - `NodeFormsPanel`: Acts as a dynamic form renderer that maps the currently selected node to its specific configuration form (e.g., `StartNodeForm`, `TaskNodeForm`).
   - `SimulationPanel`: An overlay that aggregates the graph state and communicates with the mock API.

3. **Styling Approach (Vanilla CSS)**
   To comply with the requirement for maximum flexibility and a premium aesthetic without Tailwind CSS, the application uses pure CSS (`index.css`) with standard CSS variables. This ensures deep control over micro-interactions (hover states, node selection rings, custom shadows) and provides a clean, dependency-free styling layer.

4. **Mock API Layer**
   The API is implemented as a local JavaScript service (`src/api/mockApi.js`) returning Promises wrapped in `setTimeout`. This allows the application to simulate network latency, test asynchronous state handling (loading spinners, disabled buttons), and remain entirely self-contained without needing to run a separate JSON Server process. 

## Node Types
- **Start Node**: Entry point.
- **Task Node**: Represents a human task with assignees and due dates.
- **Approval Node**: Requires manager or role-based approval.
- **Automated Action**: Triggers system events (mocked via the API).
- **End Node**: Completes the workflow.

## How to Run

1. Ensure dependencies are installed:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Assumptions
- For this prototype, persistent storage (saving to a database) is not required; the graph resets on reload.
- The simulation simply traverses the first connected path and validates cycles. Advanced path branching (e.g., condition nodes) is omitted to respect the time-box, but the architecture supports it easily via custom edges.
