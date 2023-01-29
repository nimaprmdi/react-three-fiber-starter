import React, { useState, useRef, useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const Floor = (props) => {
  const [ref, api] = useBox(() => ({ args: [20, 1, 10], ...props }));
  const materialRef = useRef();

  const texture = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + "/assets/galaxy.jpg");

  useEffect(() => {
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(8, 8);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(80, 80);

    // planeMaterial.map = texture;
  });

  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxBufferGeometry args={[100, 1, 100]} />
      <meshPhysicalMaterial color={"black"} />
    </mesh>
  );
};

export default Floor;
