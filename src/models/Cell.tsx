import {CellColors, NumberColors} from "./gameParameters";
import Board from "./Board";


export default class Cell {
  board: Board;
  readonly x: number;
  readonly y: number;
  value: number;
  color: CellColors;
  isVisible: boolean;
  isFlagOver: boolean;
  readonly id: number;

  constructor(board: Board, x: number, y: number, color:CellColors) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.isVisible = false;
    this.isFlagOver = false;
    this.id = Math.random();
  }

  createMine(): void {
    this.value = -1;
  }

  isMine(): boolean {
    return this.value === -1;
  }

  openCells(target: Cell) {
    if (!target.isVisible) {
      if (target.value === 0) {
        const cells = target.returnNearOpenCells(target)
        for (const cell of cells) {
          cell.isVisible = true;
          cell.changeBackgroundColor();
        }
        return;
      }

      target.isVisible = true;
      target.changeBackgroundColor();
    }
  }

  returnNearOpenCells(target: Cell, cells: Cell[] = []): Cell[] {
    if (!cells.includes(target))
      cells.push(target);

    const nearCells: Cell[] = target.board.nearCells(target);

    for (let cell of nearCells) {
      if (cell.isMine())
        continue
      if (cell.value === 0 && !cells.includes(cell))
        cells = this.returnNearOpenCells(cell, cells)
      else if (!cells.includes(cell))
        cells.push(cell);
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