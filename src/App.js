import "./App.css";
import React, { useCallback, useState } from "react";

const ROWS = 10;
const COLS = 10;

function App() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };

  const handleMouseEnter = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0];
        const endBox = boxNumber;

        const startRow = Math.floor((startBox - 1) / COLS); // Math.floor((23-1)/10) = 2
        const startCol = (startBox - 1) % COLS; // (23 -1)%10 = 22 % 10 = 2
        const endRow = Math.floor((endBox - 1) / COLS);
        const endCol = (endBox - 1) % COLS;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        const selected = [];
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * COLS + col + 1);
          }
        }

        setSelectedBoxes(selected);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMouseDown]
  );

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "32px" }}>Selected Grid </div>
      <div style={{ marginTop: 32, marginBottom: 32, fontSize: "24px" }}>
        Click and Drag to select an area
      </div>
      <div className="grid" onMouseUp={handleMouseUp}>
        {[...Array(ROWS * COLS).keys()].map((i) => {
          return (
            <div
              key={i}
              onMouseDown={() => handleMouseDown(i + 1)}
              onMouseEnter={() => handleMouseEnter(i + 1)}
              className={`cell ${
                selectedBoxes.includes(i + 1) ? "active-cell" : ""
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
