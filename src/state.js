import * as THREE from "three";

/**
 *
 * Here We added animation to scene using this state
 *
 * Camera Pos is the start Value
 *
 * Camera Target is the finishing point
 *
 * cameraPos & target can set programmatically
 *
 * more info in cameraControl.jsx
 *
 *
 */

// const state = {
//     activeMesh: {},
//     activeMeshName: "mesh_9",
//     cameraPos: new THREE.Vector3(7, 2, 6),
//     target: new THREE.Vector3(4, 0, 0),
//     shouldUpdate: true,
// };

const state = {
  activeMesh: {},
  activeMeshName: "mesh_9",
  cameraFov: 60,
  cameraPos: new THREE.Vector3(
    1.1989887727580826,
    3.322287045024165,
    2.2803719341998248
  ),
  target: new THREE.Vector3(
    2.0687556440072745,
    -24.278031134995025,
    -6.291957582971372
  ),

  shouldUpdate: true,
};

export default state;
