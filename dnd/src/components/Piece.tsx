import { useDrag } from "@/hooks/drag.hook";
import { ChessPiece } from "@/lib/game";

type PieceProps = {
  piece: ChessPiece | null;
  pov: "black" | "white";
  x: number;
  y: number;
};

export default function Piece({ piece, x, y, pov }: PieceProps) {
  const drag = useDrag(x, y);

  return (
    <div
      className="size-15 z-50 cursor-move select-none absolute"
      id={`${x}${y}`}
      data-x={x}
      data-y={y}
      draggable={true}
      {...drag.handlers}
      style={{
        backgroundImage: !!piece
          ? `url(./${piece.type}-${piece.color}.png)`
          : undefined,
      }}
    ></div>
  );
}
