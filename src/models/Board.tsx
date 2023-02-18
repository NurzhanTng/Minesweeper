import Cell from "./Cell";
import {CellColors} from "./gameParameters";
import randomInt from "../utils/randInt";


interface BoardProps {
  height: number,
  width: number,
  bombCount: number,
  isStarted: boolean,
  setIsStarted: (value: boolean) => void,
  startGame: (cell: Cell) => void,
  restart: () => void,
  updateBoard: (board?: Board) => Board,
}

export default class Board {
  cells: Cell[][] = [];
  selectedCell: Cell | null = null;
  gameOver: boolean = false;
  private readonly height: number;
  private readonly width: number;
  private readonly bombCount: number;
  isStarted: boolean;
  setIsStarted: BoardProps["setIsStarted"];
  startGame: (cell: Cell) => void;
  restart: () => void;
  updateBoard: (board?: Board) => Board;

  constructor({ height, width, bombCount, isStarted, setIsStarted, startGame, restart, updateBoard }: BoardProps) {
    this.height = height;
    this.width = width;
    this.bombCount = bombCount;
    this.isStarted = isStarted;
    this.setIsStarted = setIsStarted;
    this.startGame = startGame;
    this.restart = restart;
    this.updateBoard = updateBoard;
  }

  public copy(): Board {
    const board = new Board({
      height: this.height,
      width: this.width,
      bombCount: this.bombCount,
      isStarted: this.isStarted,
      setIsStarted: this.setIsStarted,
      startGame: this.startGame,
      restart: this.restart,
      updateBoard: this.updateBoard,
    });
    board.cells = this.cells;
    board.selectedCell = this.selectedCell;
    board.gameOver = this.gameOver;
    return board;
  }

  public initCells() {
    for (let i = 0; i < this.height; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.width; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(j, i, CellColors.GREEN));
        } else {
          row.push(new Cell(j, i, CellColors.DARK_GREEN));
        }
      }
      this.cells.push(row);
    }
  }

  public createMines(target: Cell) {
    let cnt: number = 0;

    while (cnt < this.bombCount) {
      const x: number = randomInt(0, this.width - 1);
      const y: number = randomInt(0, this.height - 1);

      const dx = Math.abs(x - target.x);
      const dy = Math.abs(y - target.y);

      if (dx <= 2 && dy <= 2)
        continue;
      this.cells[y][x].createMine();
      cnt++;
    }
  }

  public createNumberCells() {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.isMine()) continue;

        cell.value = cell.nearCells(this).reduce((sum, current) => {
          return current.isMine() ? sum + 1 : sum
        }, 0)
      }
    }
  }

  public click(target: Cell) {
    console.log(`click`, target, this);

    // If (game not started) => startGame
    if (!this.isStarted) {
      this.startGame(target);
      target.digUpCell(this.updateBoard());
      console.log('Game not started')
      return;
    }

    // (Double Click) => digUpCell
    if (this.selectedCell === target) {
      target.digUpCell(this);
      const newBoard = this.updateBoard();
      newBoard.selectedCell = null
      console.log('Double Click', this, newBoard)
      return;
    }

    this.selectedCell = null;

    // (cell is not Visible) => show Cell menu
    if (!target.isVisible) {
      this.selectedCell = target
      const newBoard = this.updateBoard(this);
      console.log('Not Visible Click', this, newBoard)
      return;
    }

    if (target.value === 0 && target.isVisible) {
      console.log('empty cell');
      return;
    }
    const nearCells = target.nearCells(this);
    const flagCount = nearCells.reduce((sum, cell) => (cell.isFlagOver) ? sum + 1: sum, 0);
    const emptyCellsCount = nearCells.reduce((sum, cell) => (!cell.isVisible) ? sum + 1: sum, 0);

    console.log(flagCount, emptyCellsCount, target, nearCells);

    // (near flag cells === near mines) => show Cell menu
    if (target.value === flagCount && flagCount < emptyCellsCount) {
      this.selectedCell = target
      console.log('Flag Click', this)
    }
    console.log('end')
    this.updateBoard(this);
  }

  public gameEnd() {
    setTimeout(() => {;
      this.gameOver = true;
      this.getMines().forEach(( cell ) => {
        if (!cell.isFlagOver && !cell.isVisible) cell.isVisible = true;
      })

      const newBoard = this.updateBoard(this);
      console.log('NewBoard', newBoard);
    }, 1000 )
  }

  private getMines() {
    let mines = [];
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.isMine()) {
          mines.push(cell);
        }
      }
    }
    return mines;
  }

  private getFlagCells() {
    let flags = [];
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.isFlagOver) {
          flags.push(cell);
        }
      }
    }
    return flags;
  }
}