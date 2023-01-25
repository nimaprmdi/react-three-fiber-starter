import React, { useState, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import state from "../state";

function Model(props) {
  const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);
  const meshRef = useRef();

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
    // console.log(meshRef.current.children[0].position.x);
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
      ref={meshRef}
      object={model.scene}
      scale={props.scale}
      size={[1, 1, 1]}
      {...props}
      onPointerEnter={(e) => {
        console.log("e", e);

        const material = e.object.material.clone();
        material.color.set(0x7ad5ff);
        e.object.material = material;

        e.object.position.y = 0.005;
      }}
      onPointerLeave={(e) => {
        // postion revert back
        e.object.position.y = 0;
        // Color revert back
        e.object.material.color.setHex(0xc4c4c4);
      }}
      onClick={(e) => {
        e.object.position.x += 0.00005;
      }}
      onUpdate={(self) => {
        console.log("self", self);

        self.children.map((childOBJ) => {
          // console.log("childOBJ", childOBJ);

          // childOBJ.position.set(
          //   props.cityPos.posX,
          //   props.cityPos.posY,
          //   props.cityPos.posZ
          // );

          childOBJ.material.color.set(0xc4c4c4);
        });
      }}
    />
  );
}

export default Model;
