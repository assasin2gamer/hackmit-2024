import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const SimpleGraph = () => {
  const graphRef = useRef();

  // Helper function to create a color gradient based on strength
  const getLinkColor = (strength = 1) => {
    const strengthAdjusted = (strength + 1) / 2; // Convert range from [-1, 1] to [0, 1]
    const red = Math.min(255, Math.floor(strengthAdjusted * 255));
    const green = 255 - red;
    return `rgb(${red}, ${green}, 0)`;
  };

  // Ensure slider default values are set properly
  const [minStrength, setMinStrength] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [graphData, setGraphData] = useState(null);
  const [activeTab, setActiveTab] = useState('Graph'); // Initial active tab
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSliders, setShowSliders] = useState(true); // State to toggle the slider window

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}graph_data.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setGraphData(data))
      .catch(error => console.error('Error loading graph data:', error));
  }, []);

  // Filtered graph data based on strength only
  const filteredGraphData = useMemo(() => {
    if (!graphData) return null;

    // Filter links based on strength
    const filteredLinks = graphData.links.filter(link => link.strength >= minStrength);

    return {
      nodes: graphData.nodes,
      links: filteredLinks
    };
  }, [graphData, minStrength]);

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    setActiveTab('Details');
  }, []);

  // Search logic to highlight the node if it matches the search term
  const getNodeColor = useCallback((node) => {
    if (searchTerm && node.label.toLowerCase().includes(searchTerm.toLowerCase())) {
      return 'green'; // Highlight the searched node in green
    }
    return 'gray'; // Default node color
  }, [searchTerm]);

  if (!filteredGraphData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor:'white' }}>
      <h2>Interactive Graph with Search, Sliders, Details, and Tabs</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search node..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('Details')}
          style={{ padding: '10px', marginRight: '10px', backgroundColor: activeTab === 'Details' ? 'lightgray' : 'white', color:'black' }}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab('Graph')}
          style={{ padding: '10px', backgroundColor: activeTab === 'Graph' ? 'lightgray' : 'white', color:'black' }}
        >
          Graph
        </button>
      </div>

      {/* Details Tab */}
      {activeTab === 'Details' && (
        <div style={{ padding: '20px' }}>
          <h3>Node Details</h3>
          {selectedNode ? (
            <div>
              <strong>{selectedNode.label}</strong>
              <p>Content: {selectedNode.content}</p>
            </div>
          ) : (
            <p>Click on a node to see its details</p>
          )}
        </div>
      )}

      {/* Graph Tab */}
      {activeTab === 'Graph' && (
        <div style={{ flexGrow: 0.01, position: 'relative' }}>
          {/* Sliders positioned on the top-right of the graph */}
          {showSliders && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'white',
              padding: '20px',
              border: '1px solid black',
              borderRadius: '5px',
              zIndex: 10,
              textAlign: 'center'
            }}>
              <button
                onClick={() => setShowSliders(false)}
                style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
              >
                Minimize
              </button>
              <h4>Adjust Values</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label>Min Strength:</label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={minStrength}
                  onChange={(e) => setMinStrength(parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  value={minStrength}
                  onChange={(e) => setMinStrength(parseFloat(e.target.value))}
                  style={{ width: '50px', marginLeft: '10px' }}
                  step="0.01"
                />
              </div>
            </div>
          )}

          {/* Minimize button (when sliders are hidden) */}
          {!showSliders && (
            <button
              onClick={() => setShowSliders(true)}
              style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', zIndex: 10, padding: '5px' }}
            >
              Show Sliders
            </button>
          )}

          {/* Graph */}
          <ForceGraph2D
            ref={graphRef}
            graphData={filteredGraphData}
            nodeLabel="label"
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            linkColor={(link) => getLinkColor(link.strength)}
            linkWidth={(link) => Math.max(link.strength / 5, 1)} // Ensure a minimum width
            width={800}
            height={600}
            onNodeClick={handleNodeClick}
            nodeAutoColorBy="label"
            d3AlphaDecay={0.05} // Reduce decay for stability
            d3VelocityDecay={0.2} // Slow down the velocity decay
            d3ForceCenter={true} // Add force towards the center
            nodeCanvasObject={(node, ctx) => {
              const color = getNodeColor(node);
              ctx.fillStyle = color;
              const radius = 10;
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.font = '12px Sans-Serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(node.label, node.x, node.y);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SimpleGraph;
