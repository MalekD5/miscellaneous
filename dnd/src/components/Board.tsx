import { Game } from "@/lib/game";
import { VariantProps, tv } from "tailwind-variants";
import Piece from "./Piece";

const NumberingTV = tv({
  base: "absolute select-none text-sm ",
  variants: {
    type: {
      numbers: "top-0 left-0 w-3 pl-0.5",
      alphabetic: "bottom-0 right-0.5",
    },
    color: {
      light: "text-[#ebecd0] font-bold",
      dark: "text-[#739552] font-semibold",
    },
  },
  defaultVariants: {
    type: "numbers",
    color: "light",
  },
});

type NumberingProps = {
  row: number;
  column: number;
  pov: "black" | "white";
} & Pick<VariantProps<typeof NumberingTV>, "type">;

function Numbering({ row, column, pov, type }: NumberingProps) {
  let value: string | number = "";

  if (type === "numbers") {
    value = row + 1;
  } else {
    value =
      pov === "black"
        ? String.fromCharCode(104 - column)
        : String.fromCharCode(97 + column);
  }

  return (
    <p
      className={NumberingTV({
        color: (column + row) % 2 === 0 ? "dark" : "light",
        type,
      })}
    >
      {value}
    </p>
  );
}

const BoardSpotTV = tv({
  base: "relative size-16 max-w-16 cursor-pointer flex justify-center items-center",
  variants: {
    color: {
      light: "bg-[#ebecd0]",
      dark: "bg-[#739552]",
    },
  },
});

type BoardSpotProps = {
  pov: "black" | "white";
  row: number;
  column: number;
  children?: React.ReactNode;
};

function BoardSpot({ children, ...props }: BoardSpotProps) {
  const { column, row } = props;
  return (
    <div
      draggable={false}
      className={BoardSpotTV({
        color: (column + row) % 2 === 0 ? "light" : "dark",
      })}
    >
      {column === 0 && <Numbering type="numbers" {...props} />}
      {children}
      {row === (props.pov === "black" ? 7 : 0) && (
        <Numbering type="alphabetic" {...props} />
      )}
    </div>
  );
}

type BoardProps = {
  game: Game;
};

export default function Board({ game }: BoardProps) {
  return (
    <div className="grid grid-cols-8 grid-rows-8">
      {[...Array(64)].map((_, i) => {
        const y = Math.floor(i % 8);
        const x =
          game.pov === "white" ? 7 - Math.floor(i / 8) : Math.floor(i / 8);
        const piece = game.locations[x][y];

        return (
          <BoardSpot key={`pos-${x},${y}`} column={y} row={x} pov={game.pov}>
            <Piece y={y} x={x} piece={piece} pov={game.pov} />
          </BoardSpot>
        );
      })}
    </div>
  );
}
