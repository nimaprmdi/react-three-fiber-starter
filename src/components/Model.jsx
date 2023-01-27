import React, { useState, useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import state from "../state";

function Model(props) {
  console.log("props", props);

  const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);

  useEffect(() => {
    console.log("model", model);
  }, [model]);

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

  useFrame(({ scene, delta, camera }) => {
    mixer?.update(delta);

    // console.log(camera);

    // console.log("pos", {
    //   x: camera.position.x,
    //   Y: camera.position.y,
    //   z: camera.position.z,
    // });

    // console.log("rot", {
    //   x: camera.rotation.x,
    //   Y: camera.rotation.y,
    //   z: camera.rotation.z,
    // });
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
    citySelect: {
      cameraPos: [-2.3277374131613913, 6.765905284235648, 24.935194068247295],
      target: new THREE.Vector3(
        -4.912793512892549,
        6.4723735429666895,
        25.724031396077393
      ),
      cameraFov: 60,
      name: "mesh_9",
    },
  };

  //   {
  //     "x": -2.3277374131613913,
  //     "Y": 6.765905284235648,
  //     "z": 24.935194068247295
  // }

  //   {
  //     "x": -3.1367406778024938,
  //     "Y": 1.4777558752093995,
  //     "z": 3.136761662956655
  // }

  const handleClick = (e, num) => {
    console.log(e);
    state.cameraPos.set(...cameraSets[num].cameraPos);
    state.target.set(...cameraSets[num].target);
    state.activeMeshName = cameraSets[num].name;
    state.shouldUpdate = true;

    // object postion
    e.object.position.set(-0.5412, 0.791, 2.7651);
    e.object.rotation.set(1.6193, -0.0015, -1.9148);
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
      onDoubleClick={(e) => {
        // e.object.position.x += 0.005;

        handleClick(e, "citySelect");
      }}
      onPointerLeave={(e) => {
        e.object.position.y = 0;
        e.object.material.color.setHex(0xc4c4c4);
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

          // console.log("e update", e);

          // handle all objects color
          e.material.color.set(0xc4c4c4);
        });
      }}
    />
  );
}

export default Model;
