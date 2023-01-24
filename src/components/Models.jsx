import { Suspense } from "react";
import Model from "./Model";
import BoundingBox from "./BoundingBox";
import Dragable from "./Dragable";

const Models = () => {
  const cityNames = [
    "tehran",
    "zanjan",
    "yazd",
    "sistan-baluchestan",
    "semnan",
    "qom",
    "qazvin",
    "mazandaran",
    "markazi",
    "lorestan",
    "kurdistan",
    "kohgiluyeh-boyer-ahmad",
    "khuzestan",
    "khorasan-razavi",
    "khorasan-south",
    "khorasan-north",
    "kermanshah",
    "kerman",
    "isfahan",
    "ilam",
    "hormozgan",
    "hamadan",
    "golestan",
    "gilan",
    "fars",
    "chahar-mahaal-bakhtiari",
    "bushehr",
    "azerbaijan-west",
    "azerbaijan-east",
    "ardabil",
    "alborz",
  ];

  return (
    <Suspense fallback={null}>
      {/* <Dragable transformGroup>
        <BoundingBox visible position={[-4, 3, 0]} dims={[3, 2, 6]} offset={[0, -0.8, 0]}>
          <Model path="/models/model_s/scene.gltf" scale={new Array(3).fill(0.01)} />
        </BoundingBox>
      </Dragable> */}

      {/* <Model path="/models/cities/semnan2.glb" scale={new Array(3).fill(10)} /> */}

      {cityNames.map((city, index) => {
        return (
          <Dragable key={`object-${index}`}>
            <Model position={[-4 * index, 3, 2 * index]} path={`/models/cities/${city}.glb`} scale={new Array(3).fill(10)} />
            {/* <BoundingBox visibledims={[3, 2, 6]} offset={[0, -0.8, 0]}>
            </BoundingBox> */}
          </Dragable>
        );
      })}
    </Suspense>
  );
};

export default Models;
