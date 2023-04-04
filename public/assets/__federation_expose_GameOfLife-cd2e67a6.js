import { importShared } from './__federation_fn_import.js';
import { r as reactExports } from './index-6898aa5e.js';

var jsxRuntimeExports = {};
var jsxRuntime = {
  get exports(){ return jsxRuntimeExports; },
  set exports(v){ jsxRuntimeExports = v; },
};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

(function (module) {

	{
	  module.exports = reactJsxRuntime_production_min;
	}
} (jsxRuntime));

const jsx = jsxRuntimeExports.jsx;
const jsxs = jsxRuntimeExports.jsxs;

var CELL_TYPE = /* @__PURE__ */ ((CELL_TYPE2) => {
  CELL_TYPE2[CELL_TYPE2["EMPTY"] = 0] = "EMPTY";
  CELL_TYPE2[CELL_TYPE2["WILL_BORN"] = 1] = "WILL_BORN";
  CELL_TYPE2[CELL_TYPE2["ALIVE"] = 2] = "ALIVE";
  CELL_TYPE2[CELL_TYPE2["WILL_DIE"] = 3] = "WILL_DIE";
  return CELL_TYPE2;
})(CELL_TYPE || {});
const CELL_COLORS = {
  EMPTY: "white",
  WILL_BORN: "#88AA88",
  ALIVE: "black",
  WILL_DIE: "#AA8888"
};
var MAP_STATE = /* @__PURE__ */ ((MAP_STATE2) => {
  MAP_STATE2[MAP_STATE2["GENERATE_MAP"] = 0] = "GENERATE_MAP";
  MAP_STATE2[MAP_STATE2["EVOLVE"] = 1] = "EVOLVE";
  MAP_STATE2[MAP_STATE2["NEW_GENERATION"] = 2] = "NEW_GENERATION";
  return MAP_STATE2;
})(MAP_STATE || {});
const columns = 80;
const rows = 60;
const delay = 1e3 / 30;

const generateMap = () => {
  const tmpMap = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      tmpMap.push(Math.round(Math.random()) % 2 === 0 ? CELL_TYPE.EMPTY : CELL_TYPE.ALIVE);
    }
  }
  return tmpMap;
};
const indexByCoords = (x, y) => {
  return y * columns + x;
};
const coordsByIndex = (index) => {
  return {
    x: index % columns,
    y: Math.floor(index / columns)
  };
};
const getNeighboursCount = (map, index) => {
  const { x, y } = coordsByIndex(index);
  let neighbours = 0;
  if (y > 0) {
    if (map[indexByCoords(x - 1, y - 1)] >= CELL_TYPE.ALIVE && x > 0)
      neighbours++;
    if (map[indexByCoords(x - 0, y - 1)] >= CELL_TYPE.ALIVE)
      neighbours++;
    if (map[indexByCoords(x + 1, y - 1)] >= CELL_TYPE.ALIVE && x < columns - 1)
      neighbours++;
  }
  if (map[indexByCoords(x - 1, y)] >= CELL_TYPE.ALIVE)
    neighbours++;
  if (map[indexByCoords(x + 1, y)] >= CELL_TYPE.ALIVE)
    neighbours++;
  if (y < rows - 1) {
    if (map[indexByCoords(x - 1, y + 1)] >= CELL_TYPE.ALIVE && x > 0)
      neighbours++;
    if (map[indexByCoords(x - 0, y + 1)] >= CELL_TYPE.ALIVE)
      neighbours++;
    if (map[indexByCoords(x + 1, y + 1)] >= CELL_TYPE.ALIVE && x < columns - 1)
      neighbours++;
  }
  return neighbours;
};
const evolveGeneration = (map) => {
  let tmpMap = [...map];
  for (let i = 0; i < tmpMap.length; i++) {
    const neighbours = getNeighboursCount(map, i);
    if (tmpMap[i] === CELL_TYPE.ALIVE && (neighbours < 2 || neighbours > 3)) {
      tmpMap[i] = CELL_TYPE.WILL_DIE;
    } else if (tmpMap[i] === CELL_TYPE.EMPTY && neighbours === 3) {
      tmpMap[i] = CELL_TYPE.WILL_BORN;
    }
  }
  return tmpMap;
};
const updateGeneration = (map) => {
  let tmpMap = [...map];
  for (let i = 0; i < tmpMap.length; i++) {
    if (tmpMap[i] === CELL_TYPE.WILL_DIE)
      tmpMap[i] = CELL_TYPE.EMPTY;
    else if (tmpMap[i] === CELL_TYPE.WILL_BORN)
      tmpMap[i] = CELL_TYPE.ALIVE;
  }
  return tmpMap;
};

const {memo} = await importShared('react');
const SingleCell = ({ cell, index, size }) => {
  const { x, y } = coordsByIndex(index);
  const style = {
    position: "absolute",
    width: size,
    height: size,
    left: x * size,
    top: y * size,
    //   borderRadius: size / 4,
    background: CELL_COLORS[CELL_TYPE[cell]]
  };
  return /* @__PURE__ */ jsx("div", { style }, `${x}_${y}`);
};
const SingleCell$1 = memo(SingleCell);

const index = '';

const {useCallback,useEffect,useMemo,useRef,useState} = await importShared('react');
function GameOfLife() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(0);
  const stageRef = useRef(MAP_STATE.GENERATE_MAP);
  const [isPaused, setIsPaused] = useState(false);
  let lastTime;
  const [cellMap, setCellMap] = useState([]);
  const [size, setSize] = useState(1);
  const nextCycle = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTime;
    if (delta > delay) {
      switch (stageRef.current) {
        case MAP_STATE.GENERATE_MAP:
          stageRef.current = MAP_STATE.EVOLVE;
          setCellMap(generateMap());
          break;
        case MAP_STATE.NEW_GENERATION:
          stageRef.current = MAP_STATE.EVOLVE;
          setCellMap((map) => updateGeneration(map));
          break;
        case MAP_STATE.EVOLVE:
          stageRef.current = MAP_STATE.NEW_GENERATION;
          setCellMap((map) => evolveGeneration(map));
          break;
      }
      lastTime = performance.now();
    }
    if (!isPaused) {
      animationFrameRef.current = requestAnimationFrame(nextCycle);
    }
  }, [isPaused]);
  useEffect(() => {
    lastTime = performance.now();
    if (containerRef.current) {
      setSize(containerRef.current.offsetWidth / columns);
      nextCycle();
    }
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [containerRef, nextCycle]);
  const cells = useMemo(
    () => cellMap.map((cell, index) => /* @__PURE__ */ jsx(SingleCell$1, { cell, index, size }, index)),
    [cellMap, size]
  );
  const handleRestart = () => {
    stageRef.current = MAP_STATE.GENERATE_MAP;
    if (isPaused) {
      renderNextStep();
    }
  };
  const toogleStepper = () => {
    setIsPaused((paused) => {
      const newValue = !paused;
      if (!newValue) {
        lastTime = performance.now();
        animationFrameRef.current = requestAnimationFrame(nextCycle);
      }
      return newValue;
    });
  };
  const renderNextStep = () => {
    if (isPaused) {
      lastTime = performance.now() - delay;
      animationFrameRef.current = requestAnimationFrame(nextCycle);
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: { width: "100%" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-sm", onClick: handleRestart, children: "Restart" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-sm", onClick: toogleStepper, children: isPaused ? "Continue" : "Pause" }),
      isPaused && /* @__PURE__ */ jsx("button", { className: "btn btn-sm", onClick: renderNextStep, children: "Next" })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { position: "relative", width: "100%", backgroundColor: "white" }, ref: containerRef, children: cells })
  ] });
}

export { GameOfLife as default, jsx as j };
