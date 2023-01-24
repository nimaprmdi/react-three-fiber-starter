import React from "react";
import state from "../state";

const styles = {
  height: "30px",
  width: "30px",
  position: "absolute",
  zIndex: 1,
  bottom: "30vh",
  backgroundColor: "white",
  borderRadius: "999px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
};

const CameraButton = () => {
  const sets = {
    // CyberTruck
    1: {
      cameraPos: [7, 2, 6],
      target: [4, 0, 0],
      name: "mesh_9",
    },
    // Model 3
    2: {
      cameraPos: [1, 2, 5],
      target: [-4, 0, 0],
      name: "object005_bod_0",
    },
  };

  const handleClick = (num) => {
    state.cameraPos.set(...sets[num].cameraPos);
    state.target.set(...sets[num].target);
    state.activeMeshName = sets[num].name;
    state.shouldUpdate = true;
  };

  return (
    <React.Fragment>
      <button
        onClick={() => handleClick(2)}
        style={{
          ...styles,
          left: "30vw",
        }}
      >
        {"<"}
      </button>
      <button
        onClick={() => handleClick(1)}
        style={{
          ...styles,
          right: "30vw",
        }}
      >
        {">"}
      </button>
    </React.Fragment>
  );
};

export default CameraButton;
