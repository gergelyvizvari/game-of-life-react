export enum CELL_TYPE {
    EMPTY = 0,
    WILL_BORN = 1,
    ALIVE = 2,
    WILL_DIE = 3,
}

export const CELL_COLORS:{[key: string]:string} = {
    EMPTY : "white",
    WILL_BORN : "#88AA88",
    ALIVE : "black",
    WILL_DIE : "#AA8888",
}

export enum MAP_STATE {
    GENERATE_MAP = 0,
    EVOLVE = 1,
    NEW_GENERATION = 2,
}

export const columns = 80;
export const rows = 60;
export const delay = 1000/30;