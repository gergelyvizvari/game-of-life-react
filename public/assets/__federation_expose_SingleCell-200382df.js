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
    borderRadius: size / 4,
    background: CELL_COLORS[CELL_TYPE[cell]]
  };
  return /* @__PURE__ */ jsx("div", { style }, `${x}_${y}`);
};
const SingleCell$1 = memo(SingleCell);

export { MAP_STATE as M, jsxs as a, columns as c, delay as d, SingleCell$1 as default, evolveGeneration as e, generateMap as g, jsx as j, updateGeneration as u };
