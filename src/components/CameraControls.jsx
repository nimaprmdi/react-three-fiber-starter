import { useEffect } from "react";
import camState from "../camState";
import { useFrame } from "@react-three/fiber";

const CameraControls = ({}) => {
  useFrame(({ camera, scene }) => {
    if (camState.activeMesh.name !== camState.activeMeshName) {
      camState.activeMesh = scene.getObjectByName(camState.activeMeshName) || {};
    }
    if (camState.shouldUpdate) {
      scene.orbitControls.target.lerp(camState.target, 0.05); // Rotation XYZ + animation (lerp)
      camera.position.lerp(camState.cameraPos, 0.05); // Pos XYZ + animation (lerp)
      camera.fov = camState.cameraFov;

      scene.orbitControls.update();
      camera.updateProjectionMatrix();
      const diff = camera.position.clone().sub(camState.cameraPos).length();

      if (diff < 0.05) {
        camState.shouldUpdate = false;
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
