import { Suspense } from "react";
import Model from "./Model";
import BoundingBox from "./BoundingBox";
import Dragable from "./Dragable";

const Car = () => {
  return (
    <Suspense fallback={null}>
      {/* <Dragable transformGroup>
                <BoundingBox visible position={[-4, 3, 0]} dims={[3, 2, 6]} offset={[0, -0.8, 0]}>
                    <Model path="/models/model_s/scene.gltf" scale={new Array(3).fill(0.01)} />
                </BoundingBox>
            </Dragable> */}

      {/* <Model path="/models/cities/semnan2.glb" scale={new Array(3).fill(10)} /> */}

      <Model path="/models/cities/qom.glb" scale={[10, 15, 10]} position={[0, 0, 0]} />
    </Suspense>
  );
};

export default Car;
