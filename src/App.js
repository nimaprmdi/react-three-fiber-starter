import React from "react";
import Orbit from "./components/Orbit";
import Box from "./components/Box";
import Floor from "./components/Floor";
import Background from "./components/Background";
import ColorPicker from "./components/ColorPicker";
import Dragable from "./components/Dragable";
import Car from "./components/Car";
import CameraControls from "./components/CameraControls";
import CameraButton from "./components/CameraButton";
import Lights from "./components/Lights";
import MoveObjectButton from "./components/MoveObjectButton";
import Effects from "./components/Effects";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/cannon";

function App() {
  return (
    <div
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
      }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ColorPicker />
      <CameraButton />
      {/* <MoveObjectButton /> */}

      <Canvas camera={{ position: [7, 7, 7] }} shadows>
        <CameraControls />

        <Suspense fallback={null}>
          <Background />
        </Suspense>

        {/* <fog attach="fog" args={["white", 1, 10]} /> */}

        <Orbit />

        <ambientLight intensity={0.2} />

        <Lights />

        <axesHelper args={[5]} />
        <Physics>
          <Car />

          <Dragable>
            <Suspense fallback={null}>
              <Box position={[-7, 1, 0]} />
            </Suspense>

            <Suspense fallback={null}>
              <Box position={[7, 1, 0]} />
            </Suspense>
          </Dragable>

          <Floor position={[0, -0.5, 0]} />

          <Effects />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
