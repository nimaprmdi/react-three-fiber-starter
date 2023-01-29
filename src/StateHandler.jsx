import React, { useState } from "react";
import * as THREE from "three";

const StateHandler = () => {
  const [state, setState] = useState({
    activeMesh: {},
    activeMeshName: "mesh_9",
    cameraFov: 60,
    cameraPos: new THREE.Vector3(1.2925079701279205, 2.9094955535224685, 1.7899098885654006),
    target: new THREE.Vector3(1.1094561235257534, -26.932054700062817, -5.226214060467602),
    shouldUpdate: true,

    isCityUp: false,
    selectedCity: null,
  });

  return { state, setState };
};

export default StateHandler;
