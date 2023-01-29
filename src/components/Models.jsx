import { Suspense } from "react";
import Model from "./Model";
import BoundingBox from "./BoundingBox";
import Dragable from "./Dragable";

// @todo : Make them as objects so they with the position and the rotation they needed
const Models = ({ opts, isCityUp, setIsCityUp, displayGUI }) => {
  return (
    <Suspense fallback={null}>
      <Model
        displayGUI={displayGUI}
        isCityUp={isCityUp}
        setIsCityUp={setIsCityUp}
        cityPos={opts}
        position={[1, -0.1, 1]}
        path={`/models/country/iran_4.glb`}
        scale={new Array(3).fill(10)}
      />
    </Suspense>
  );
};

export default Models;
