// イベント層 (main.ts)
// クリックされた時の処理とマス目を結びつける。
// キャンバスを用意してマス目を描き、マスのクリックと全消去ボタンに処理を結びつける。
// この層は完成済み（ステップ1で render.ts を実装すれば動く）。

import { clearCanvas, paintCell, getCellColor, GRID_SIZE, PAINT_COLOR, DEFAULT_COLOR, EMPTY_COLOR, getPaintColor, setPaintColor } from "./canvas";
import { renderGrid, renderCell } from "./render";

function main(): void {
  // キャンバスを用意する（1回呼ぶと、全マスが白になる）。
  clearCanvas();

  // マス目を画面に並べる。
  renderGrid();

  // 全マスを class（pixel-cell）でまとめて取得して、クリック時の処理を結びつける。
  // index が「何番目のマスか」なので、そのまま処理の中で使える。
  const cells = document.getElementsByClassName("pixel-cell");
  for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("click", () => {
      // PAINT_COLORを取得する。
      getPaintColor();

      // データを更新する（このマスを黒で塗る）。
      paintCell(index, PAINT_COLOR);

      // render.ts の renderCell を実装すると、ここでマスが塗られる（ステップ1）。
      renderCell(index, PAINT_COLOR);
    });
  }

  const clearButton = document.getElementById("clear-button");
  clearButton?.addEventListener("click", () => {
    clearCanvas();
    // 全マスを、データ上の色（全消去後なので白）で塗り直す。
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      renderCell(i, getCellColor(i));
    }
  });

  const whiteButton = document.getElementById("white-button");
  whiteButton?.addEventListener("click", () => {
    setPaintColor(EMPTY_COLOR)
  });

  const blackButton = document.getElementById("black-button");
  blackButton?.addEventListener("click", () => {
    setPaintColor(DEFAULT_COLOR)
  });
}

main();
