import { Suspense } from "react";
import Model from "./Model";
import BoundingBox from "./BoundingBox";
import Dragable from "./Dragable";

// @todo : Make them as objects so they with the position and the rotation they needed
const Models = ({ opts }) => {
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

  // tehran
  // x: -0.20677710760053158;
  // y: -0.0009525223190298693;
  // z: 0.11210555082242357;

  // semnan
  // x: 1.5293275967452347;
  // y: -0.0023984236925219116;
  // z: -0.6545929816853131;

  // isfahan
  // x: 6.885167496573959;
  // y: 0.023384919623186062;
  // z: -3.3260421343770648;

  // lorestan
  // x: 0.6634330049266014;
  // y: 0.00020972074288777565;
  // z: -0.046452734180286226;

  // Sistan Baloochestan
  // x: 1.2819834285666347;
  // y: 0.03586968578217459;
  // z: -0.0019889191795909866;

  //

  return (
    <Suspense fallback={null}>
      {/* <Dragable transformGroup>
        <BoundingBox visible position={[-4, 3, 0]} dims={[3, 2, 6]} offset={[0, -0.8, 0]}>
          <Model path="/models/model_s/scene.gltf" scale={new Array(3).fill(0.01)} />
        </BoundingBox>
      </Dragable> */}

      <Dragable key={`object`}>
        <Model
          cityPos={opts}
          position={[1, -0.02, 1]}
          path={`/models/country/iran.glb`}
          scale={new Array(3).fill(10)}
        />
      </Dragable>

      {/* cityNames.map((city, index) => {
      return (
        <Dragable key={`object-${index}`}>
            <Model
              position={[-4 * index, 3, 2 * index]}
              path={`/models/cities/${city}.glb`}
              scale={new Array(3).fill(10)}
            />
            {/* <BoundingBox visibledims={[3, 2, 6]} offset={[0, -0.8, 0]}>
            </BoundingBox> 
          </Dragable>
        );
      }) */}
    </Suspense>
  );
};

export default Models;
