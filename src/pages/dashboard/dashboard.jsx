import React, { useState, useEffect, useCallback } from 'react'; 
import Graph from './graph/graph'; 
import './dashboard.css'; 
import SimpleGraph from './node/node'; 
import { ConvexReactClient } from 'convex/react';
import { useMutation } from 'convex/react'; 
import { Tooltip } from 'chart.js';
import { Menu } from './menu/menu';
import { UserButton } from '@clerk/clerk-react'; // Import Clerk's UserButton

// ResizableComponent is a wrapper to handle resizing logic
function ResizableComponent({ children, initialWidth, initialHeight, minWidth = 200, minHeight = 200, maxWidth = 1000, maxHeight = 1000 }) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isResizingX, setIsResizingX] = useState(false);
  const [isResizingY, setIsResizingY] = useState(false);

  // Handle horizontal resizing
  const handleMouseDownX = () => {
    setIsResizingX(true);
  };

  // Handle vertical resizing
  const handleMouseDownY = () => {
    setIsResizingY(true);
  };

  const handleMouseMoveX = useCallback((e) => {
    if (!isResizingX) return;

    // Throttle resizing using requestAnimationFrame for width
    requestAnimationFrame(() => {
      let newWidth = Math.max(minWidth, Math.min(e.clientX, maxWidth));
      setWidth(newWidth);
    });
  }, [isResizingX, minWidth, maxWidth]);

  const handleMouseMoveY = useCallback((e) => {
    if (!isResizingY) return;

    // Throttle resizing using requestAnimationFrame for height
    requestAnimationFrame(() => {
      let newHeight = Math.max(minHeight, Math.min(e.clientY, maxHeight));
      setHeight(newHeight);
    });
  }, [isResizingY, minHeight, maxHeight]);

  const handleMouseUp = () => {
    setIsResizingX(false);
    setIsResizingY(false);
  };

  useEffect(() => {
    if (isResizingX || isResizingY) {
      window.addEventListener('mousemove', isResizingX ? handleMouseMoveX : handleMouseMoveY);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', isResizingX ? handleMouseMoveX : handleMouseMoveY);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', isResizingX ? handleMouseMoveX : handleMouseMoveY);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingX, isResizingY, handleMouseMoveX, handleMouseMoveY]);

  return (
    <div
      className="resizable-component"
      style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}
    >
      {children}
      {/* Horizontal Resizer */}
      <div
        className="resizer resizer-horizontal"
        style={{
          width: '10px',
          height: '100%',
          background: 'gray',
          position: 'absolute',
          right: 0,
          top: 0,
          cursor: 'ew-resize',
        }}
        onMouseDown={handleMouseDownX}
      ></div>
      {/* Vertical Resizer */}
      <div
        className="resizer resizer-vertical"
        style={{
          width: '100%',
          height: '10px',
          background: 'gray',
          position: 'absolute',
          left: 0,
          bottom: 0,
          cursor: 'ns-resize',
        }}
        onMouseDown={handleMouseDownY}
      ></div>
    </div>
  );
}

// Dashboard component
function Dashboard() {
  const addData = useMutation('addData');

  const handleAddData = async () => {
    await addData({ data: { name: 'Test', description: 'Test' } });
  };

  return (
    <div className="dashboard-container">

      {/* Top-right UserButton for profile and sign out */}
      <div className="top-right">
        <UserButton afterSignOutUrl="/login" /> {/* Automatically handles sign-out */}
      </div>

      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div>
          <button onClick={handleAddData}>Insert Document</button>
        </div>
        <div className="icon green"></div>
        <div className="icon gray"></div>
        <div className="icon gray"></div>
        <div className="icon gray"></div>
        <div className="icon gray"></div>
      </div>

      {/* Main Content with Resizing */}
      <div className="node-graph">
        <ResizableComponent initialWidth={'100vw'} initialHeight={'100vh'}>
          <SimpleGraph />
          <div className="main-content">
            <div className="graph-header">
              <h2>Portfolio Analytics</h2>
              <div className="timeframe">
                <span>1D</span>
                <span>5D</span>
                <span>1M</span>
                <span>1Y</span>
                <span>5Y</span>
                <span>Max</span>
              </div>
            </div>
            <ResizableComponent initialWidth={600} initialHeight={400}>
              <Graph />
            </ResizableComponent>
          </div>
        </ResizableComponent>
      </div>

      <div>
        <Menu />
      </div>

    </div>
  );
}

export default function App() {
  return (
    <Dashboard />
  );
}
