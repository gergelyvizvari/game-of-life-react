import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MAP_STATE, columns, delay, rows } from "./GameOfLife.types";
import SingleCell from "./GameOfLife.SingleCell";
import { evolveGeneration, generateMap, updateGeneration } from "./GameOfLife.helpers";
import './index.css';


export default function GameOfLife() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const stageRef = useRef<MAP_STATE>(MAP_STATE.GENERATE_MAP);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    let lastTime: number;

    const [cellMap, setCellMap] = useState<number[]>([])
    const [size, setSize] = useState<number>(1)

    const resizeWindow = useCallback(()=>{
        if (containerRef.current) {
            setSize(containerRef.current.offsetWidth / (columns + 1));
        }
    }, [containerRef]);

    useEffect(() => {    
        window.addEventListener('resize', resizeWindow);

        ()=>{
            window.removeEventListener('resize', resizeWindow);
        }
    }, [])
    

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
            resizeWindow();
            nextCycle();
        }

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [containerRef, nextCycle]);

    const cells = useMemo(() =>
        cellMap.map((cell, index) => (
            <SingleCell key={index} cell={cell} index={index} size={size} />
        )),
        [cellMap, size]
    );

    const handleRestart = () => {
        stageRef.current = MAP_STATE.GENERATE_MAP;
        if (isPaused) {
            renderNextStep();
        }
    }

    const toogleStepper = () => {
        setIsPaused((paused)=>{
            const newValue = !paused;
            if (!newValue) {
                lastTime = performance.now();
                animationFrameRef.current = requestAnimationFrame(nextCycle);
            }
            return newValue;
        })   
    }

    const renderNextStep = () => {
        if (isPaused) {
            lastTime = performance.now() - delay;
            animationFrameRef.current = requestAnimationFrame(nextCycle);
        }
    }

    const buttonClassName = '';

    return (
        <div style={{ width: '100%',  }}>
            <div className="flex gap-2 mb-2">
                <button className="btn btn-sm" onClick={handleRestart}>Restart</button>
                <button className="btn btn-sm" onClick={toogleStepper}>{isPaused ? 'Continue' : 'Pause'}</button>
                {isPaused && <button className="btn btn-sm" onClick={renderNextStep}>Next</button>}
            </div>
            <div style={{ position: 'relative', width: '100%',backgroundColor: 'white' }} ref={containerRef}>
                {cells}
            </div>
        </div>
    )
}
