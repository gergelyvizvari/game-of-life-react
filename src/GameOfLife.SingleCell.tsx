import { DetailedHTMLProps, HTMLAttributes, memo, useMemo } from "react";
import { coordsByIndex } from "./GameOfLife.helpers";
import { CELL_COLORS, CELL_TYPE } from "./GameOfLife.types";

const SingleCell = ({ cell, index, size }: { cell: number, index: number, size: number }) => {
    const { x, y } = coordsByIndex(index);

    const styleInner = {      
      width: size-2,
      height: size-2,
      marginLeft:1,
      marginRight:1,
      borderRadius: size / 2,
      borderColor: 'white',
      background: CELL_COLORS[CELL_TYPE[cell]],
    }  as HTMLAttributes<HTMLDivElement>;

    const styleOuter = {
        position: "absolute",
        width: size+2,
        height: size+2,
        left: x * size-1,
        top: y * size+1,           
        background: 'white',
        
      }  as HTMLAttributes<HTMLDivElement>;

    return <div key={`${x}_${y}`} style={styleOuter}>
        <div style={styleInner}></div>
    </div>
}

export default memo(SingleCell);