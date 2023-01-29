import React, { useState, useRef, useEffect, useContext } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import camState from "../camState";
import objectState from "../objectState";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

// context
import { PrimaryContext } from "../context/PrimaryContext";

function Model(props) {
  const [animationState, setAnimationState] = useState(false);
  const { state, dispatch } = useContext(PrimaryContext);
  const meshRef = useRef();
  const { scene, animations, nodes } = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

  let mixer;
  if (animations.length > 0) {
    mixer = new THREE.AnimationMixer(scene);

    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
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

  // chatgpt
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  let x = 0;
  useFrame(({ scene, delta, camera }) => {
    mixer?.update(delta);

    if (meshRef.current) {
      TWEEN.update();
    }
  });

  useEffect(() => {
    if (meshRef.current && state.selectedCity && animationState) {
      const selectedChild = meshRef.current.children.find((child) => child.name === state.selectedCity.name);

      const mesh = selectedChild;
      const tweenPosition = new TWEEN.Tween(mesh.position).to({ x: -0.16, y: 0.05, z: -0.05 }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();
      const tweenRotation = new TWEEN.Tween(mesh.rotation).to({ x: 1.5, y: 0.055, z: 0.055 }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();

      tweenPosition.onUpdate(() => {
        setPosition([mesh.position.x, mesh.position.y, mesh.position.z]);
      });

      tweenRotation.onUpdate(() => {
        setRotation([mesh.rotation.x, mesh.rotation.y, mesh.rotation.z]);
      });

      selectedChild.position.set(position[0], position[1], position[2]);
      selectedChild.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  }, [animationState]);

  return (
    <mesh>
      <primitive
        object={scene}
        scale={props.scale}
        ref={meshRef}
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
            const child = meshRef.current.children.find((child) => child.name === state.selectedCity.name);
          }
        }}
      />
    </mesh>
  );
}

export default Model;
