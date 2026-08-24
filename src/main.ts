// イベント層 (main.ts)
// クリックされた時の処理とマス目を結びつける。
// キャンバスを用意してマス目を描き、マスのクリックと全消去ボタンに処理を結びつける。
// この層は完成済み（ステップ1で render.ts を実装すれば動く）。

import { clearCanvas, getCellColor, grid_creation, totalCells, setPaintColor, PALETTE_COLORS} from "./canvas";
import { renderGrid, renderCell } from "./render";
import { gridEventsBind } from "./feature-drag";

function gridSetup(r: number, c: number): void {
  // グリッドの行数と列数を更新する
  grid_creation(r, c);

  // マス目を描画（DOMの再生成）
  renderGrid(r, c);
  
  // 作成されたマス目にイベントを登録
  gridEventsBind();
}

function main(): void {
  // キャンバスを用意する（1回呼ぶと、全マスが白になる）。
  clearCanvas();

  // 初期表示：ページ読み込み時に 16×16 で1度実行する
  gridSetup(16, 16);

  // マス目の行数・列数を変更するボタンのクリックイベントを登録する
  const rowsInput = document.getElementById("rows-input") as HTMLInputElement;
  const colsInput = document.getElementById("cols-input") as HTMLInputElement;
  const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;

  generateBtn.addEventListener("click", () => {
  const inputRows = parseInt(rowsInput.value, 10);
  const inputCols = parseInt(colsInput.value, 10);
  
  // マス目を画面に並べる。イベントの付与もまとめた関数をここで呼ぶ。もともとあった下の命令は不要になったので消した。
  gridSetup(inputRows, inputCols);
});

  // 全マスを class（pixel-cell）でまとめて取得して、クリック時の処理を結びつける。←gridsetup() にまとめた。

  const clearButton = document.getElementById("clear-button");
  clearButton?.addEventListener("click", () => {
    clearCanvas();
    // 全マスを、データ上の色（全消去後なので白）で塗り直す。
    for (let i = 0; i < totalCells; i++) {
      renderCell(i, getCellColor(i));
    }
  });

  const paletteContainer = document.getElementById("palette");
  console.log("paletteContainer:", paletteContainer);

  // colorpaletteの要素の数だけ、その色に対応したボタンを生成する
  PALETTE_COLORS.forEach((color) => {
  const button = document.createElement("button");
  button.style.backgroundColor = color;
  button.className = "color-button";

  // ボタンを押した時の処理
  button.addEventListener("click", () => {
    setPaintColor(color);
  });

  paletteContainer?.appendChild(button);
});
}

main();
