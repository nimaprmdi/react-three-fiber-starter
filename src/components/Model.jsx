import React, { useState, useRef, useEffect, useContext } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import camState from "../camState";
import objectState from "../objectState";

// context
import { PrimaryContext } from "../context/PrimaryContext";

function Model(props) {
  const [animationState, setAnimationState] = useState(false);
  const { state, dispatch } = useContext(PrimaryContext);
  const objRef = useRef();

  const { scene, animations, nodes } = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

  let mixer;
  if (animations.length > 0) {
    mixer = new THREE.AnimationMixer(scene);

    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  let x = 0;
  useFrame(({ scene, delta, camera }) => {
    mixer?.update(delta);

    if (state.selectedCity && animationState) {
      const selectedChild = objRef.current.children.find((child) => child.name === state.selectedCity.name);

      objRef.current.children.map((child) => {
        if (child.name !== selectedChild.name) {
          child.material.opacity -= 0.01;
        } else {
          if (selectedChild.material.opacity < 1) {
            selectedChild.material.opacity += 0.01;
          }
        }
      });
    }
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      child.material.side = THREE.FrontSide;
    }
  });

  const cameraSets = {
    citySelect: {
      cameraPos: [2.5790249891330435, 1.0837018399047853, 3.8996706953566083],
      target: [-4.6207906965525725, -9.079737226323157, -24.267069032120112],
      cameraFov: 60,
      name: "mesh_9",
    },
  };

  const handlePointerEnter = (e) => {
    const material = e.object.material.clone();
    material.color.set(0x7ad5ff);
    e.object.material = material;

    if (!state.isCityUp) {
      e.object.position.y = 0.005;
    }
  };

  const handlePointerLeave = (e) => {
    if (!state.isCityUp) {
      e.object.position.y = 0;
    }
    e.object.material.color.setHex(0xc4c4c4);
  };

  const handleDoubleClick = (e, num) => {
    dispatch({ type: "SELECT_CITY", payload: e.object });
    dispatch({ type: "SET_CITY_UP", payload: true });

    // camState.cameraPos.set(...cameraSets[num].cameraPos);
    // camState.target.set(...cameraSets[num].target);
    // camState.activeMeshName = cameraSets[num].name;
    // camState.shouldUpdate = true;

    setAnimationState(true);
  };

  return (
    <primitive
      object={scene}
      scale={props.scale}
      ref={objRef}
      size={[1, 1, 1]}
      {...props}
      onPointerEnter={(e) => handlePointerEnter(e)}
      onPointerLeave={(e) => handlePointerLeave(e)}
      onDoubleClick={(e) => handleDoubleClick(e, "citySelect")}
      onUpdate={(self) => {
        console.log(self);

        if (state.selectedCity) {
          self.position.x = state.selectedCity.position.x;
        }

        self.children.map((child) => {
          child.material.transparent = true;
          child.material.color.setHex(0xc4c4c4);
        });

        if (state.selectedCity) {
          const child = objRef.current.children.find((child) => child.name === state.selectedCity.name);

          // child.position.x = props.cityPos.posX;
          // child.position.y = props.cityPos.posY;
          // child.position.z = props.cityPos.posZ;

          // child.rotation.x = props.cityPos.rotX;
          // child.rotation.y = props.cityPos.rotY;
          // child.rotation.z = props.cityPos.rotZ;
        }
      }}
    />
  );
}

export default Model;
