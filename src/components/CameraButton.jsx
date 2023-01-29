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

const CameraButton = ({ isCityUp, setIsCityUp }) => {
  const sets = {
    1: {
      cameraPos: [7, 2, 6],
      target: [4, 0, 0],
      name: "mesh_9",
    },
    2: {
      cameraPos: [1, 2, 5],
      target: [-4, 0, 0],
      name: "object005_bod_0",
    },
    backToCountry: {
      cameraPos: [1.1989887727580826, 3.322287045024165, 2.2803719341998248],
      target: [2.0687556440072745, -24.278031134995025, -6.291957582971372],
      cameraFov: 60,
      name: "mesh_9",
    },
  };

  const handleClick = (num) => {
    state.cameraPos.set(...sets[num].cameraPos);
    state.target.set(...sets[num].target);
    state.activeMeshName = sets[num].name;
    state.shouldUpdate = true;

    if (num === "backToCountry") {
      setIsCityUp(false);
    }
  };

  return (
    <React.Fragment>
      <button
        onClick={() => handleClick("backToCountry")}
        style={{
          ...styles,
          right: "40vw",
        }}
      >
        {"Back"}
      </button>

      {/* <button
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
      </button> */}
    </React.Fragment>
  );
};

export default CameraButton;
