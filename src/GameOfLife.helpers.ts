import { CELL_TYPE, columns, rows } from "./GameOfLife.types";

export const generateMap = () => {
    const tmpMap = [];    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            tmpMap.push((Math.round(Math.random()) % 2 === 0) ? CELL_TYPE.EMPTY : CELL_TYPE.ALIVE);
        }
    }
    return tmpMap;
}

const indexByCoords = (x: number, y: number) => {
    return (y * columns) + x
}

export const coordsByIndex = (index: number): { x: number, y: number } => {
    return {
        x: index % columns,
        y: Math.floor(index / columns),
    }
}

export const getNeighboursCount = (map: number[], index: number) => {
    const { x, y } = coordsByIndex(index);
    let neighbours = 0;

    if (y > 0) {
        if (map[indexByCoords(x - 1, y - 1)] >= CELL_TYPE.ALIVE && x > 0 ) neighbours++;
        if (map[indexByCoords(x - 0, y - 1)] >= CELL_TYPE.ALIVE) neighbours++;
        if (map[indexByCoords(x + 1, y - 1)] >= CELL_TYPE.ALIVE && (x < columns - 1)) neighbours++;
    }

    if (map[indexByCoords(x - 1, y)] >= CELL_TYPE.ALIVE) neighbours++;
    if (map[indexByCoords(x + 1, y)] >= CELL_TYPE.ALIVE) neighbours++;

    if (y < rows - 1) {
        if (map[indexByCoords(x - 1, y + 1)] >= CELL_TYPE.ALIVE && x > 0 ) neighbours++;
        if (map[indexByCoords(x - 0, y + 1)] >= CELL_TYPE.ALIVE) neighbours++;
        if (map[indexByCoords(x + 1, y + 1)] >= CELL_TYPE.ALIVE && (x < columns - 1)) neighbours++;
    }

    return neighbours;
}

export const evolveGeneration = (map: number[]) => {
    let tmpMap = [...map];
    for (let i = 0; i < tmpMap.length; i++) {
        const neighbours = getNeighboursCount(map, i);
        if (tmpMap[i] === CELL_TYPE.ALIVE && (neighbours < 2 || neighbours > 3)) {
            tmpMap[i] = CELL_TYPE.WILL_DIE;
        }
        else if (tmpMap[i] === CELL_TYPE.EMPTY && neighbours === 3) {
            tmpMap[i] = CELL_TYPE.WILL_BORN;
        }
    }
    return tmpMap;
}

export const updateGeneration = (map: number[]) => {
    let tmpMap = [...map];
    for (let i = 0; i < tmpMap.length; i++) {
        if (tmpMap[i] === CELL_TYPE.WILL_DIE) tmpMap[i] = CELL_TYPE.EMPTY;
        else if (tmpMap[i] === CELL_TYPE.WILL_BORN) tmpMap[i] = CELL_TYPE.ALIVE;
    }
    return tmpMap;
}