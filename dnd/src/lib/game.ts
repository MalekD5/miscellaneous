type PieceType = "p" | "n" | "k" | "q" | "r" | "b";
type PieceColors = "white" | "black";

export abstract class ChessPiece {
  readonly type: PieceType;
  readonly promotable: boolean;
  readonly pieceValue: number;
  readonly color: PieceColors;

  moves: [number, number][] = [];
  taken: boolean;
  col: number = -1;
  row: number = -1;

  constructor(
    color: PieceColors,
    type: PieceType,
    pieceValue: number,
    promotable: boolean,
  ) {
    this.type = type;
    this.pieceValue = pieceValue;
    this.promotable = promotable;
    this.taken = false;
    this.color = color;
  }

  abstract move(Game: Game, newX: number, newY: number): void;
}

export class Pawn extends ChessPiece {
  twoSqaures: boolean = false;
  moveCounter: number = 0;

  constructor(color: PieceColors, row: number, col: number) {
    super(color, "p", 1, true);
    this.col = col;
    this.row = row;

    // initial moves
    if (color === "white") {
      this.moves.push([row + 1, col], [row + 2, col]);
    } else {
      this.moves.push([row - 1, col], [row - 2, col]);
    }
  }

  move(game: Game, newX: number, newY: number) {
    this.moveCounter++;

    // check if there is a piece in front of the pawn
    const forwardX = this.color === "white" ? newX + 1 : newX - 1;

    const blockingPiece = game.locations[forwardX][newY];

    if (!blockingPiece) this.moves = [[forwardX, newY]];
    else this.moves = [];

    const checkTwoSquares = Math.abs(newX - this.row);
    this.twoSqaures = checkTwoSquares === 2 && this.moveCounter < 2;

    const leftY = newY - 1;
    const rightY = newY + 1;

    const directionalX = this.color === "white" ? newX + 1 : newX - 1;

    if (leftY > 0) {
      const left = game.locations[directionalX][leftY];
      if (left) {
        this.moves.push([directionalX, leftY]);
      }
      // en passant
      const passantLeft = game.locations[newX][leftY];
      if (this.twoSqaures && passantLeft && passantLeft.type === "p") {
        passantLeft.moves.push([
          passantLeft.color === "white" ? newX + 1 : newX - 1,
          newY,
        ]);
        game.enpassant = {
          counter: game.enpassant.counter + 1,
          piece: passantLeft,
          move: [passantLeft.color === "white" ? newX + 1 : newX - 1, newY],
        };
      }
    }

    if (rightY < 8) {
      const right = game.locations[directionalX][rightY];
      if (right) {
        this.moves.push([directionalX, rightY]);
      }

      const passantRight = game.locations[newX][rightY];
      if (this.twoSqaures && passantRight && passantRight.type === "p") {
        passantRight.moves.push([
          passantRight.color === "white" ? newX + 1 : newX - 1,
          newY,
        ]);
        game.enpassant = {
          counter: game.enpassant.counter + 1,
          piece: passantRight,
          move: [passantRight.color === "white" ? newX + 1 : newX - 1, newY],
        };
      }
    }

    game.locations[this.row][this.col] = null;
    game.locations[newX][newY] = this;

    this.col = newY;
    this.row = newX;
  }
}

export class Knight extends ChessPiece {
  constructor(color: PieceColors, row: number, col: number) {
    super(color, "n", 3, false);
    this.col = col;
    this.row = row;
  }
  move(Game: Game, newX: number, newY: number) {
    // todo: update cache
  }
}

export class King extends ChessPiece {
  constructor(color: PieceColors, row: number, col: number) {
    super(color, "k", 99999, false);
    this.col = col;
    this.row = row;
  }
  move(Game: Game, newX: number, newY: number) {
    // todo: update cache
  }
}

export class Queen extends ChessPiece {
  constructor(color: PieceColors, row: number, col: number) {
    super(color, "q", 8, false);
    this.col = col;
    this.row = row;
  }
  move(Game: Game, newX: number, newY: number) {
    // todo: update cache
  }
}

export class Bishop extends ChessPiece {
  constructor(color: PieceColors, row: number, col: number) {
    super(color, "b", 3, false);
    this.col = col;
    this.row = row;
  }
  move(Game: Game, newX: number, newY: number) {
    // todo: update cache
  }
}

export class Rook extends ChessPiece {
  constructor(color: PieceColors, row: number, col: number) {
    super(color, "r", 5, false);
    this.col = col;
    this.row = row;
  }
  move(Game: Game, newX: number, newY: number) {
    // todo: update cache
  }
}

type Enpassant = {
  counter: number;
  piece: ChessPiece | null;
  move: [number, number];
};

export class Game {
  pov: "white" | "black" = "white";
  locations: (ChessPiece | null)[][] = [];
  initialized: boolean = false;
  enpassant: Enpassant = {
    counter: 0,
    piece: null,
    move: [-1, -1],
  };

  init(pov: "white" | "black") {
    this.pov = pov;
    this.enpassant = {
      counter: 0,
      piece: null,
      move: [-1, -1],
    };

    this.locations = [...Array(8)].map(() => [...Array(8)].map(() => null));

    for (let i = 0; i < 8; i++) {
      this.locations[1][i] = new Pawn("white", 1, i);
      this.locations[6][i] = new Pawn("black", 6, i);
    }

    this.locations[0][0] = new Rook("white", 0, 0);
    this.locations[0][7] = new Rook("white", 0, 7);

    this.locations[7][0] = new Rook("black", 7, 0);
    this.locations[7][7] = new Rook("black", 7, 7);

    this.locations[0][1] = new Knight("white", 0, 1);
    this.locations[0][6] = new Knight("white", 0, 6);

    this.locations[7][1] = new Knight("black", 7, 1);
    this.locations[7][6] = new Knight("black", 7, 6);

    this.locations[0][2] = new Bishop("white", 0, 2);
    this.locations[0][5] = new Bishop("white", 0, 5);

    this.locations[7][2] = new Bishop("black", 7, 2);
    this.locations[7][5] = new Bishop("black", 7, 5);

    this.locations[0][4] = new King("white", 0, 4);
    this.locations[7][4] = new King("black", 7, 4);

    this.locations[0][3] = new Queen("white", 0, 3);
    this.locations[7][3] = new Queen("black", 7, 3);

    this.initialized = true;
  }

  isInitialized() {
    return this.initialized;
  }
}
