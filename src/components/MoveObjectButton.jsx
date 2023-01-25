import state from "../state";
import { useFrame } from "@react-three/fiber";
import React from "react";

const MoveObjectButton = () => {
  useFrame(({ camera, scene }) => {
    if (state.activeMesh.name !== state.activeMeshName) {
      state.activeMesh = scene.getObjectByName(state.activeMeshName) || {};
    }
    if (state.shouldUpdate) {
      camera.position.lerp(state.cameraPos, 0.1);
      scene.orbitControls.target.lerp(state.target, 0.1);
      scene.orbitControls.update();
      const diff = camera.position.clone().sub(state.cameraPos).length();

      if (diff < 0.1) state.shouldUpdate = false;
    }

    console.log("camera controls");
  });

  return null;

  // return (
  //   <div style={{ postion: "fixed", top: 0, left: 0, width: "100%", height: "50px", backgroundColor: "red", zIndex: 999 }}>
  //     <button style={{ backgroundColor: "green" }} onClick={() => console.log("clicked")}>
  //       Change Pos
  //     </button>
  //   </div>
  // );
};

export default MoveObjectButton;
