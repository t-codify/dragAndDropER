import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  Handle,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
} from "react-flow-renderer";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { allTables } from "./assets/tableList.mock";
import { useCallback, useState } from "react";
import { BackgroundVariant } from "@xyflow/react";
const initialNodes = [];
const initialEdges = [];

function App() {
  const [tables, setTables] = useState(allTables.tables); // List of tables fetched from mock data
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const removeNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  // Drag-and-drop table component
  const DraggableTable = ({ table }) => {
    const [, drag] = useDrag(() => ({
      type: "table",
      item: table,
    }));

    return (
      <div
        ref={drag}
        className="table-item"
        style={{
          cursor: "move",
          padding: "10px",
          border: "1px solid #ccc",
          margin: "5px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {table.name}
      </div>
    );
  };
  const nodeTypes = {
    default: (props) => <DefaultNode {...props} removeNode={removeNode} />,
  };

  const DropZone = () => {
    const [, drop] = useDrop({
      accept: "table",
      drop: (item, monitor) => {
        if (nodes.some((node) => node.id === item.id)) {
          alert("Table already exists");
          return;
        }

        const dropZone = document.querySelector(".drop-zone");
        const dropZoneBounds = dropZone.getBoundingClientRect();
        const nodeWidth = 150;
        const nodeHeight = 150;
        const margin = 30;
        const maxColumns = Math.floor(
          dropZoneBounds.width / (nodeWidth + margin)
        );

        // Track positions already used
        const usedPositions = new Set(
          nodes.map((node) => {
            const col = Math.floor(node.position.x / (nodeWidth + margin));
            const row = Math.floor(node.position.y / (nodeHeight + margin));
            return `${col},${row}`;
          })
        );

        // Find the first available position
        let foundPosition = false;
        let newX = margin,
          newY = margin;
        for (let row = 0; !foundPosition && row < 100; row++) {
          for (let col = 0; col < maxColumns; col++) {
            const positionKey = `${col},${row}`;
            if (!usedPositions.has(positionKey)) {
              newX = col * (nodeWidth + margin) + margin;
              newY = row * (nodeHeight + margin) + margin;
              usedPositions.add(positionKey);
              foundPosition = true;
              break;
            }
          }
        }

        // Create and add the new node
        const newNode = {
          id: item.id,
          type: "default",
          position: { x: newX, y: newY },
          data: {
            label: item.name,
            columns: item.columns,
          },
        };

        setNodes((prevNodes) => {
          if (!prevNodes.some((node) => node.id === newNode.id)) {
            return [...prevNodes, newNode];
          }
          return prevNodes;
        });
      },
    });

    const handleNodesChange = (changes) => {
      setNodes((prevNodes) => {
        const updatedNodes = applyNodeChanges(changes, prevNodes);
        const isEqual =
          JSON.stringify(updatedNodes) === JSON.stringify(prevNodes);
        if (!isEqual) {
          return updatedNodes;
        }

        return prevNodes;
      });
    };

    return (
      <div
        ref={drop}
        className="drop-zone"
        style={{ height: "100%", width: "100%" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={handleNodesChange}
          onEdgesChange={(changes) =>
            setEdges((eds) => applyEdgeChanges(changes, eds))
          }
          nodeTypes={nodeTypes}
          style={{ width: "100%", height: "100%" }}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    );
  };

  const DefaultNode = ({ data, id, removeNode }) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <button
          onClick={() => removeNode(id)}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: "20px",
            height: "20px",
          }}
        >
          &times;
        </button>

        <strong>{data.label}</strong>
        <div
          style={{ overflowY: "auto", maxHeight: "150px", marginTop: "10px" }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "0 auto",
              textAlign: "left",
              backgroundColor: "white",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th style={{ padding: "5px", border: "1px solid #ddd" }}>
                  Column
                </th>
                <th style={{ padding: "5px", border: "1px solid #ddd" }}>
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {data.columns.map((col) => {
                return (
                  <tr key={col.column_id}>
                    <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                      {col.name}
                    </td>
                    <td style={{ padding: "5px", border: "1px solid #ddd" }}>
                      {col.column_data_type}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Handle
          type="source"
          position="right"
          id="a"
          style={{ background: "green", width: "10px", height: "10px" }}
        />
        <Handle
          type="target"
          position="left"
          id="b"
          style={{ background: "red", width: "10px", height: "10px" }}
        />
      </div>
    );
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <div
        className="table-list"
        style={{
          width: "250px",
          padding: "10px",
          borderRight: "2px solid #ccc",
        }}
      >
        <h3>Tables</h3>
        {tables.map((table) => (
          <DraggableTable key={table.id} table={table} />
        ))}
      </div>
      <div
        className="react-flow-container"
        style={{ flex: 1, position: "relative" }}
      >
        <DropZone />
      </div>
    </div>
  );
}
const DragAndDrop = () => (
  <DndProvider backend={HTML5Backend}>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </DndProvider>
);
export default DragAndDrop;
