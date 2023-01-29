import * as THREE from "three";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import StateHandler from "../StateHandler";

// context

function Model(props) {
  const { state } = StateHandler();
  const [animationState, setAnimationState] = useState(false);

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

    // camState.cameraPos.set(...cameraSets[num].cameraPos);
    // camState.target.set(...cameraSets[num].target);
    // camState.activeMeshName = cameraSets[num].name;
    // camState.shouldUpdate = true;

    setAnimationState(true);
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
    console.log("props.isCityUp", props.isCityUp);

    if (meshRef.current && state.selectedCity) {
      const selectedChild = meshRef.current.children.find((child) => child.name === state.selectedCity.name);

      // selectedChild.geometry.computeBoundingBox();
      // let matrix = new THREE.Vector3([15, 15, 15]);
      // let offset = selectedChild.geometry.boundingBox.getCenter(matrix);
      // selectedChild.position.copy(meshRef.current.position);
      // meshRef.current.children.push(selectedChild);

      const mesh = selectedChild;

      console.log("mesh.position", mesh.position);
      console.log("mesh.rotatin", mesh.rotation);

      let tweenPosition = {};
      let tweenRotation = {};

      if (props.isCityUp) {
        tweenPosition = new TWEEN.Tween(mesh.position).to({ x: -0.16, y: 0.05, z: -0.05 }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();
        tweenRotation = new TWEEN.Tween(mesh.rotation).to({ x: 1.5, y: 0.055, z: 0.055 }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();
      } else {
        tweenPosition = new TWEEN.Tween(mesh.position)
          .to({ x: -0.1671915203332901, y: 0, z: 0.13377836346626282 }, 2000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        tweenRotation = new TWEEN.Tween(mesh.rotation).to({ x: 0, y: 0, z: 0 }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();
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
          // console.log(self);

          if (state.selectedCity) {
            self.position.x = state.selectedCity.position.x;
          }

          let x = [];

          self.children.map((child) => {
            child.material.transparent = true;
            child.material.color.setHex(0xc4c4c4);

            x.push({ name: child.name, posY: 0 });
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
