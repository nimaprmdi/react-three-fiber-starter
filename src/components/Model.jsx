import React from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Model(props) {
  const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

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

  // console.log(props.path, model);

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  model.scene.name =
    props.name || `model-uuid-${Math.random() * 100}-${Math.random() * 100}`;

  return (
    <primitive
      object={model.scene}
      scale={props.scale}
      size={[1, 1, 1]}
      {...props}
    />
  );
}

export default Model;
