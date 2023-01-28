import React, { useState } from "react";
import Orbit from "./components/Orbit";
import Box from "./components/Box";
import Floor from "./components/Floor";
import Background from "./components/Background";
import ColorPicker from "./components/ColorPicker";
import Dragable from "./components/Dragable";
import Models from "./components/Models";
import CameraControls from "./components/CameraControls";
import CameraButton from "./components/CameraButton";
import Lights from "./components/Lights";
import MoveObjectButton from "./components/MoveObjectButton";
import Effects from "./components/Effects";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import DatGui, { DatNumber, DatColor } from "react-dat-gui";
import "./assets/css/style.css";
import PrimaryProvider from "./context/PrimaryContext";

function App() {
  const [opts, setOpts] = useState({
    posX: 0,
    posY: 0,
    posZ: 0,

    rotX: 0,
    rotY: 0,
    rotZ: 0,
  });

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
      {/* <ColorPicker /> */}

      <CameraButton />

      {/* <MoveObjectButton /> */}

      <Canvas onCreated={(state) => state.gl.setClearColor("#000000")} camera={{ position: [7, 7, 7] }} shadows>
        <PrimaryProvider>
          <CameraControls />
          {/* <Suspense fallback={null}>
          <Background />
        </Suspense> */}
          {/* <fog attach="fog" args={["white", 1, 10]} /> */}
          <Orbit />
          <ambientLight intensity={0.2} />
          <Lights />
          <axesHelper args={[5]} />
          <Physics>
            <Models opts={opts} />

            {/*<Dragable>
            <Suspense fallback={null}>
              <Box position={[-7, 1, 0]} />
            </Suspense>

            <Suspense fallback={null}>
              <Box position={[7, 1, 0]} />
            </Suspense>
          </Dragable> */}

            <Floor position={[0, -0.5, 0]} />

            {/* <Effects /> */}
          </Physics>{" "}
        </PrimaryProvider>
      </Canvas>

      {/* <DatGui data={opts} onUpdate={setOpts}>
        <DatNumber path="posX" min={-15} max={15} step={0.001} />
        <DatNumber path="posY" min={-15} max={15} step={0.001} />
        <DatNumber path="posZ" min={-15} max={15} step={0.001} />

        <DatNumber path="rotX" min={-15} max={15} step={0.001} />
        <DatNumber path="rotY" min={-15} max={15} step={0.001} />
        <DatNumber path="rotZ" min={-15} max={15} step={0.001} />
      </DatGui> */}
    </div>
  );
}

export default App;
