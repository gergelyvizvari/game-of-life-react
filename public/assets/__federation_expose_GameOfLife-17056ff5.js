import { importShared } from './__federation_fn_import.js';
import SingleCell, { M as MAP_STATE, d as delay, e as evolveGeneration, u as updateGeneration, g as generateMap, c as columns, j as jsx, a as jsxs } from './__federation_expose_SingleCell-200382df.js';

const {useCallback,useEffect,useMemo,useRef,useState} = await importShared('react');
function GameOfLife() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(0);
  const stageRef = useRef(MAP_STATE.GENERATE_MAP);
  const pauseRef = useRef(false);
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
    if (!pauseRef.current) {
      animationFrameRef.current = requestAnimationFrame(nextCycle);
    }
  }, []);
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
    () => cellMap.map((cell, index) => /* @__PURE__ */ jsx(SingleCell, { cell, index, size }, index)),
    [cellMap, size]
  );
  const handleRestart = () => {
    stageRef.current = MAP_STATE.GENERATE_MAP;
    if (pauseRef.current) {
      renderNextStep();
    }
  };
  const toogleStepper = () => {
    pauseRef.current = !pauseRef.current;
    if (!pauseRef.current) {
      lastTime = performance.now();
      animationFrameRef.current = requestAnimationFrame(nextCycle);
    }
  };
  const renderNextStep = () => {
    if (pauseRef.current) {
      lastTime = performance.now() - delay;
      animationFrameRef.current = requestAnimationFrame(nextCycle);
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: { width: "100%" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("button", { className: "btn pb-2", onClick: handleRestart, children: "Restart" }),
      /* @__PURE__ */ jsx("button", { className: "btn pb-2", onClick: toogleStepper, children: pauseRef.current ? "continue" : "Pause" }),
      pauseRef.current && /* @__PURE__ */ jsx("button", { className: "btn pb-2", onClick: renderNextStep, children: "Next" })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { position: "relative", width: "100%" }, ref: containerRef, children: cells })
  ] });
}

export { GameOfLife as default };
