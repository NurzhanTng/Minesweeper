import {CellColors, NumberColors} from "./gameParameters";
import Board from "./Board";


export default class Cell {
  readonly x: number;
  readonly y: number;
  value: number;
  color: CellColors;
  isVisible: boolean;
  isFlagOver: boolean;
  readonly id: string;

  constructor(x: number, y: number, color:CellColors) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.isVisible = false;
    this.isFlagOver = false;
    this.id = `[${x}, ${y}]`;
  }

  createMine(): void {
    this.value = -1;
  }

  isMine(): boolean {
    return this.value === -1;
  }

  digUpCell(board: Board) {
    if (this.isVisible) {
      const nearCells = this.nearCells(board);
      const flagCount = nearCells.reduce((sum, cell) => (cell.isFlagOver) ? sum + 1: sum, 0);
      const emptyCellsCount = nearCells.reduce((sum, cell) => (!cell.isVisible) ? sum + 1: sum, 0);

      if (!(this.value === flagCount && flagCount < emptyCellsCount)) return;

      nearCells.forEach((cell) => {
        if (!cell.isFlagOver && !cell.isVisible) cell.digUpCell(board);
      });

      return;
    }

    if (this.isMine()) {
      this.isVisible = true;
      const newBoard = board.updateBoard();
      newBoard.gameEnd();
      return;
    }

    if (this.value !== 0) {
      this.openCell();
      return;
    }

    this.returnNearOpenCells(board).forEach(( cell ) => {
      cell.openCell();
    });
  }

  openCell() {
    this.isVisible = true;
    this.changeBackgroundColor();
  }

  returnNearOpenCells(board: Board, cells: Cell[] = []): Cell[] {
    if (!cells.includes(this))
      cells.push(this);

    const nearCells: Cell[] = this.nearCells(board);

    for (let cell of nearCells) {
      if (cell.isMine()) continue;
      if (cell.value === 0 && !cells.includes(cell)) {
        cells = cell.returnNearOpenCells(board, cells)
      }
      else if (!cells.includes(cell)) {
        cells.push(cell);
      }
    }

    return cells
  }

  nearCells(board: Board) {
    let cells: Cell[] = []

    for (let row of board.cells) {
      for (let cell of row) {
        const dx = Math.abs(cell.x - this.x);
        const dy = Math.abs(cell.y - this.y);

        if ( dx <= 1 && dy <=1 && !(dx === 0 && dy === 0))
          cells.push(cell);
      }
    }

    return cells
  }

  changeBackgroundColor(): void {
    if (this.color === CellColors.GREEN)
      this.color = CellColors.BROWN
    if (this.color === CellColors.DARK_GREEN)
      this.color = CellColors.DARK_BROWN
  }

  getColor() {
    switch (this.value) {
      case 1:
        return NumberColors[1]
      case 2:
        return NumberColors[2]
      case 3:
        return NumberColors[3]
      case 4:
        return NumberColors[4]
      case 5:
        return NumberColors[5]
      case 6:
        return NumberColors[6]
      case 7:
        return NumberColors[7]
      case 8:
        return NumberColors[8]
    }
  }
}