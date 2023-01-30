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

function App() {
  const [displayGUI, setDisplayGUI] = useState(false);
  const [isCityUp, setIsCityUp] = useState(false);
  const [opts, setOpts] = useState({
    posX: 0.03,
    posY: 0.19,
    posZ: 0.09,

    rotX: 1.59,
    rotY: -0.07,
    rotZ: -0.06,
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
      <CameraButton isCityUp={isCityUp} setIsCityUp={setIsCityUp} />

      <Canvas onCreated={(state) => state.gl.setClearColor("#000000")} camera={{ position: [7, 7, 7] }} shadows>
        <CameraControls />

        <fog attach="fog" args={["#000000", 5, 50]} />

        <Orbit />
        <ambientLight intensity={0.2} />
        <Lights />
        <axesHelper args={[5]} />
        <Physics>
          <Models displayGUI={displayGUI} opts={opts} isCityUp={isCityUp} setIsCityUp={setIsCityUp} />

          <Floor position={[0, -0.5, 0]} />
        </Physics>
      </Canvas>
      {displayGUI && (
        <DatGui data={opts} onUpdate={setOpts}>
          <DatNumber path="posX" min={-5} max={5} step={0.001} />
          <DatNumber path="posY" min={-5} max={5} step={0.001} />
          <DatNumber path="posZ" min={-5} max={5} step={0.001} />

          <DatNumber path="rotX" min={-5} max={5} step={0.001} />
          <DatNumber path="rotY" min={-5} max={5} step={0.001} />
          <DatNumber path="rotZ" min={-5} max={5} step={0.001} />
        </DatGui>
      )}
    </div>
  );
}

export default App;
