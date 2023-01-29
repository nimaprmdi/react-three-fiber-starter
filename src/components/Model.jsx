import * as THREE from "three";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import StateHandler from "../StateHandler";

// context

function Model(props) {
  const { state } = StateHandler();
  const [children, setChildren] = useState([]);

  const meshRef = useRef();
  const { scene, animations } = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

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

    if (!props.isCityUp) {
      e.object.position.y = 0.005;
    }
  };

  const handlePointerLeave = (e) => {
    if (!props.isCityUp) {
      e.object.position.y = 0;
    }
    e.object.material.color.setHex(0xc4c4c4);
  };

  const handleDoubleClick = (e, num) => {
    // props.isCityUp = true;
    props.setIsCityUp(true);
    state.selectedCity = e.object;

    state.cameraPos.set(...cameraSets[num].cameraPos);
    state.target.set(...cameraSets[num].target);
    state.activeMeshName = cameraSets[num].name;
    state.shouldUpdate = true;
  };

  // chatgpt positions
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
    if (meshRef.current && state.selectedCity) {
      const selectedChild = meshRef.current.children.find((child) => child.name === state.selectedCity.name);

      const mesh = selectedChild;

      let tweenPosition = {};
      let tweenRotation = {};

      if (props.isCityUp) {
        tweenPosition = new TWEEN.Tween(mesh.position).to({ x: -0.16, y: 0.05, z: -0.05 }, 1100).easing(TWEEN.Easing.Quadratic.Out).start();
        tweenRotation = new TWEEN.Tween(mesh.rotation).to({ x: 1.5, y: 0.055, z: 0.055 }, 1100).easing(TWEEN.Easing.Quadratic.Out).start();
      } else {
        tweenPosition = new TWEEN.Tween(mesh.position)
          .to({ x: -0.1671915203332901, y: 0, z: 0.13377836346626282 }, 1100)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        tweenRotation = new TWEEN.Tween(mesh.rotation).to({ x: 0, y: 0, z: 0 }, 1100).easing(TWEEN.Easing.Quadratic.Out).start();
      }

      tweenPosition.onUpdate(() => {
        setPosition([mesh.position.x, mesh.position.y, mesh.position.z]);
      });

      tweenRotation.onUpdate(() => {
        setRotation([mesh.rotation.x, mesh.rotation.y, mesh.rotation.z]);
      });

      selectedChild.position.set(position[0], position[1], position[2]);
      selectedChild.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  }, [props.isCityUp]);

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
          let x = [];
          self.children.map((child) => {
            child.material.transparent = true;
            child.material.color.setHex(0xc4c4c4);
            x.push({ id: child.name, name: child.name, posX: 0, posY: 0, posZ: 0 });
          });

          if (state.selectedCity) {
            const child = meshRef.current.children.find((child) => child.name === state.selectedCity.name);

            // child.position.x = props.cityPos.posX;
            // child.position.y = props.cityPos.posY;
            // child.position.z = props.cityPos.posZ;

            // child.rotation.x = props.cityPos.rotX;
            // child.rotation.y = props.cityPos.rotY;
            // child.rotation.z = props.cityPos.rotZ;
          }
        }}
      />
    </mesh>
  );
}

export default Model;
