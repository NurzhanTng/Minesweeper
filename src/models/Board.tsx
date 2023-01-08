import Cell from "./Cell";
import {CellColors} from "./gameParameters";
import randomInt from "../utils/randInt";


interface BoardProps {
  height: number,
  width: number,
  bombCount: number,
  isStarted: boolean,
  setIsStarted: (value: boolean) => void,
}

export default class Board {
  cells: Cell[][] = [];
  private readonly height: number;
  private readonly width: number;
  private readonly bombCount: number;
  isStarted: boolean;
  setIsStarted: BoardProps["setIsStarted"];

  constructor({ height, width, bombCount, isStarted, setIsStarted }: BoardProps) {
    this.height = height;
    this.width = width;
    this.bombCount = bombCount;
    this.isStarted = isStarted;
    this.setIsStarted = setIsStarted;
  }


  public initCells() {
    for (let i = 0; i < this.height; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.width; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, CellColors.GREEN));
        } else {
          row.push(new Cell(this, j, i, CellColors.DARK_GREEN));
        }
      }
      this.cells.push(row);
    }
  }

  createMines(target: Cell) {
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

  createNumberCells() {
    console.log('CreateNumberCells')
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.isMine()) {
          console.log(cell.x, cell.y, 'Mine');
          continue
        }

        cell.value = this.nearCells(cell).reduce((sum, current) => {
          return current.isMine() ? sum + 1 : sum
        }, 0)
        console.log([cell.x, cell.y, cell.value, this.nearCells(cell)]);
      }
    }
  }

  nearCells(target: Cell) {
    let cells: Cell[] = []

    for (let row of this.cells) {
      for (let cell of row) {
        const dx = Math.abs(cell.x - target.x);
        const dy = Math.abs(cell.y - target.y);

        if ( dx <= 1 && dy <=1 && !(dx === 0 && dy === 0))
          cells.push(cell);
      }
    }

    return cells
  }
}