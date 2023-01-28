import React, { useState, useRef, useEffect, useContext } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import camState from "../camState";

// context
import { PrimaryContext } from "../context/PrimaryContext";

function Model(props) {
  const [isCityUp, setIsCityUp] = useState(false);
  const { state, dispatch } = useContext(PrimaryContext);
  const childMeshRef = useRef();

  const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

  let mixer;
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);

    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame(({ scene, delta, camera }) => {
    mixer?.update(delta);
  });

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  const cameraSets = {
    citySelect: {
      cameraPos: [-2.3277374131613913, 6.765905284235648, 24.935194068247295],
      target: new THREE.Vector3(-4.912793512892549, 6.4723735429666895, 25.724031396077393),
      cameraFov: 60,
      name: "mesh_9",
    },
  };

  const handlePointerEnter = (e) => {
    const material = e.object.material.clone();
    material.color.set(0x7ad5ff);
    e.object.material = material;

    if (!isCityUp) {
      e.object.position.y = 0.005;
    }
  };

  const handlePointerLeave = (e) => {
    if (!isCityUp) {
      e.object.position.y = 0;
    }
    e.object.material.color.setHex(0xc4c4c4);
  };

  const handleDoubleClick = (e, num) => {
    const object = e.object.clone();
    dispatch({ type: "SELECT_CITY", payload: object });
    dispatch({ type: "SET_CITY_UP", payload: true });

    setIsCityUp(true);

    camState.cameraPos.set(...cameraSets[num].cameraPos);
    camState.target.set(...cameraSets[num].target);
    camState.activeMeshName = cameraSets[num].name;
    camState.shouldUpdate = true;

    // Object postion
    e.object.position.set(-0.5412, 0.791, 2.7651);
    e.object.rotation.set(1.6193, -0.0015, -1.9148);
  };

  return (
    <primitive
      object={model.scene}
      scale={props.scale}
      size={[1, 1, 1]}
      {...props}
      onPointerEnter={(e) => handlePointerEnter(e)}
      onPointerLeave={(e) => handlePointerLeave(e)}
      onDoubleClick={(e) => handleDoubleClick(e, "citySelect")}
      onUpdate={(self) => {
        self.children.map((city) => {
          city.material.color.set(0xc4c4c4);

          if (state.selectedCity && state.selectedCity.name === city.name) {
            // const x = city.position.prototype.copy();
            console.log(city);
          }
          if (state.selectedCity && !state.isCityUp && state.selectedCity.name === city.name) {
            city.position.set(state.selectedCity.position.x, state.selectedCity.position.y, state.selectedCity.position.z);
          }
        });
      }}
    />
  );
}

export default Model;
