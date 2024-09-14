import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const SimpleGraph = () => {
  const graphRef = useRef();

  // Helper function to create a color gradient from green to red based on risk
  const getRiskColor = (risk) => {
    const red = Math.min(255, Math.floor((risk / 10) * 255)); // Risk max is assumed to be 10
    const green = Math.min(255, Math.floor((1 - risk / 10) * 255));
    return `rgb(${red}, ${green}, 0)`;
  };

  const [graphData, setGraphData] = useState(null);
  const [activeTab, setActiveTab] = useState('Graph'); // Initial active tab
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSliders, setShowSliders] = useState(true); // State to toggle the slider window

  // Sliders for controlling thresholds
  const [minStrength, setMinStrength] = useState(0);
  const [minTime, setMinTime] = useState(0);
  const [minRisk, setMinRisk] = useState(0);

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

  // Filtered graph data based on thresholds
  const filteredGraphData = useMemo(() => {
    if (!graphData) return null;

    // Filter links based on strength, time, and risk
    const filteredLinks = graphData.links.filter(link => 
      link.strength >= minStrength && 
      link.time >= minTime && 
      link.risk >= minRisk
    );

    return {
      nodes: graphData.nodes,
      links: filteredLinks
    };
  }, [graphData, minStrength, minTime, minRisk]);

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    // set tabs to details when a node is clicked
    setActiveTab('Details');
  }, []);

  if (!filteredGraphData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor:'white' }}>
      <h2>Interactive Graph with Sliders, Details, and Tabs</h2>

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
        <div style={{ flexGrow: 1, position: 'relative' }}>
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
                  min="0"
                  max="100"
                  value={minStrength}
                  onChange={(e) => setMinStrength(parseInt(e.target.value))}
                />
                <input
                  type="number"
                  value={minStrength}
                  onChange={(e) => setMinStrength(parseInt(e.target.value))}
                  style={{ width: '50px', marginLeft: '10px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label>Min Time:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minTime}
                  onChange={(e) => setMinTime(parseInt(e.target.value))}
                />
                <input
                  type="number"
                  value={minTime}
                  onChange={(e) => setMinTime(parseInt(e.target.value))}
                  style={{ width: '50px', marginLeft: '10px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label>Min Risk:</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={minRisk}
                  onChange={(e) => setMinRisk(parseInt(e.target.value))}
                />
                <input
                  type="number"
                  value={minRisk}
                  onChange={(e) => setMinRisk(parseInt(e.target.value))}
                  style={{ width: '50px', marginLeft: '10px' }}
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
            linkColor={(link) => getRiskColor(link.risk)}
            linkWidth={(link) => link.strength / 5}
            linkDistance={(link) => link.time * 100}
            width={800}
            height={600}
            onNodeClick={handleNodeClick}
            nodeAutoColorBy="label"
            d3AlphaDecay={0.05} // Reduce decay for stability
            d3VelocityDecay={0.2} // Slow down the velocity decay
            d3ForceCenter={true} // Add force towards the center
            nodeCanvasObject={(node, ctx) => {
              ctx.fillStyle = 'gray';
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
