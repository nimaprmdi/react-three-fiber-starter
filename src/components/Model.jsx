import React, { useState, useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import state from "../state";

function Model(props) {
  const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

  // get default city position
  const [objPos, setObjPos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  let mixer;
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);

    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((scene, delta) => {
    mixer?.update(delta);
  });

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  // model.scene.name =
  //   props.name || `model-uuid-${Math.random() * 100}-${Math.random() * 100}`;

  const cameraSets = {
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
    state.cameraPos.set(...cameraSets[num].cameraPos);
    state.target.set(...cameraSets[num].target);
    state.activeMeshName = cameraSets[num].name;
    state.shouldUpdate = true;
  };

  return (
    <primitive
      object={model.scene}
      scale={props.scale}
      size={[1, 1, 1]}
      {...props}
      onPointerEnter={(e) => {
        const material = e.object.material.clone();
        material.color.set(0x7ad5ff);
        e.object.material = material;

        e.object.position.y = 0.005;
      }}
      onPointerLeave={(e) => {
        e.object.position.y = 0;
        e.object.material.color.setHex(0xc4c4c4);
      }}
      onClick={(e) => {
        console.log(e.object.name);
        // handleClick(1);
        // e.object.position.x += 0.005;
      }}
      onUpdate={(self) => {
        console.log("self", self);

        self.children.map((e) => {
          /** ShowCase */
          // const material = new THREE.MeshBasicMaterial({
          //   color: 0x00ff00,
          //   side: THREE.BackSide,
          // });
          // childOBJ.material = material;

          console.log(e.position.x);

          // handle all objects color
          e.material.color.set(0xc4c4c4);
        });
      }}
    />
  );
}

export default Model;
