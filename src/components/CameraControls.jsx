import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import state from "../state";

const CameraControls = ({}) => {
  useFrame(({ camera, scene }) => {
    if (state.activeMesh.name !== state.activeMeshName) {
      state.activeMesh = scene.getObjectByName(state.activeMeshName) || {};
    }
    if (state.shouldUpdate) {
      scene.orbitControls.target.lerp(state.target, 0.05); // Rotation XYZ + animation (lerp)
      camera.position.lerp(state.cameraPos, 0.05); // Pos XYZ + animation (lerp)
      camera.fov = state.cameraFov;

      scene.orbitControls.update();
      camera.updateProjectionMatrix();
      const diff = camera.position.clone().sub(state.cameraPos).length();

      if (diff < 0.05) {
        state.shouldUpdate = false;
        console.log("Animation Ended");
      }
    }

    // console.log("rot");
    // console.log([camera.position.x, camera.position.y, camera.position.z]);
    // console.log(scene.orbitControls.target);
  });

  return null;
};

export default CameraControls;
