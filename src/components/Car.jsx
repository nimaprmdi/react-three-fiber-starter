import { Suspense } from "react";
import Model from "./Model";
import BoundingBox from "./BoundingBox";
import Dragable from "./Dragable";

const Car = () => {
  return (
    <Suspense fallback={null}>
      {/* <Model path="/models/cities/semnan2.glb" scale={new Array(3).fill(10)} /> */}

      <Model path="/models/cities/zanjan.glb" scale={[10, 10, 10]} position={[1, 1, 1]} />
    </Suspense>
  );
};

export default Car;
