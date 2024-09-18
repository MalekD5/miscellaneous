import { useGame } from "@/context/GameContext";
import { Pawn } from "@/lib/game";

type DragEvent = Omit<React.DragEvent<HTMLDivElement>, "target"> & {
  target: HTMLDivElement;
};

export const useDrag = (x: number, y: number) => {
  const game = useGame();

  return {
    handlers: {
      onDragStart(event: DragEvent) {
        console.log("start");
        event.target.style.opacity = "0.8";
        const piece = game.locations[x][y];

        if (piece) {
          event.dataTransfer.setData(
            "img",
            `./${piece.type}-${piece.color}.png`,
          );
          event.dataTransfer.setData("x", `${piece.row}`);
          event.dataTransfer.setData("y", `${piece.col}`);
          event.target.id = "drag";

          for (const move of piece.moves) {
            document
              .getElementById(`${move[0]}${move[1]}`)!
              .classList.add("possible-move");
          }
        } else {
          console.log("piece not ??");
        }
      },

      onDragOver(event: DragEvent) {
        if (
          event.target === document.getElementById("drag") ||
          !event.dataTransfer.getData("img")
        ) {
          console.log("nien");

          return;
        }
        const x = Number(event.dataTransfer.getData("x"));
        const y = Number(event.dataTransfer.getData("y"));

        const piece = game.locations[x][y];

        if (!piece) return;

        const possibleMoves = piece.moves;

        const newX = Number(event.target.getAttribute("data-x")!);
        const newY = Number(event.target.getAttribute("data-y")!);

        if (
          possibleMoves.findIndex(
            (val) => val[0] === newX && val[1] === newY,
          ) !== -1
        ) {
          event.preventDefault();
        } else {
          console.log("nagh");
        }
      },

      onDragEnter(event: DragEvent) {},

      onDrop(event: DragEvent) {
        console.log("drop");
        event.stopPropagation();
        const original = document.getElementById("drag")!;

        const img = event.dataTransfer.getData("img");

        const originalX = Number(event.dataTransfer.getData("x"));
        const originalY = Number(event.dataTransfer.getData("y"));

        const newX = Number(event.target.getAttribute("data-x")!);
        const newY = Number(event.target.getAttribute("data-y")!);

        event.target.style.backgroundImage = `url(${img})`;
        original.id = "";
        original.style.backgroundImage = "";

        const piece = game.locations[originalX][originalY]!;

        // check if the move is enpassant, if not then take en passsant right from the player
        const enpassantPiece = game.enpassant.piece;

        // if there enpassant move that exists and the piece responsible
        if (enpassantPiece) {
          // if the piece played was not a pawn, or was not the enpassant pawn
          // then take enpassant right away from the player
          if (piece.type !== "p" || piece !== enpassantPiece) {
            enpassantPiece.moves = enpassantPiece.moves.filter(
              (move) =>
                move[0] === game.enpassant.move[0] &&
                move[1] === game.enpassant.move[1],
            );
          }

          game.enpassant.piece = null;
          game.enpassant.move = [-1, -1];
        }

        piece.move(game, newX, newY);

        return true;
      },

      onDragEnd(event: DragEvent) {
        event.target.style.opacity = "1";

        // edge case, sometimes the drag id is not removed
        const original = document.getElementById("drag");
        if (original) original.id = "";

        // const moveHighlight = document.getElementsByClassName("possible-move");
        // if (moveHighlight && moveHighlight.length > 0) {
        //   Array.from(moveHighlight).forEach((el) =>
        //     el.classList.remove("possible-move"),
        //   );
        // }
      },
    },
  };
};
