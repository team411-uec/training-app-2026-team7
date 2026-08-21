// 描画層 (render.ts)
// 状態を受け取って画面(DOM)に表示するだけを担当する。
// 塗るロジックは canvas.ts、クリックと処理の連携は main.ts が持つ。

import { totalCells, paintCell, PAINT_COLOR, getPaintColor} from "./canvas";

// マス目（セル）を画面に並べて作る（完成済み）。
// totalCells の数だけ <div> を作り、#canvas に追加する。
// 各セルには class="pixel-cell" を付ける（まとめて取得し、index 番目で1マスずつ狙う）。
const CELL_SIZE = 20;
const setCanvasWidth = (cols: number): void => {
  const container = document.getElementById("canvas");
  if (!container) return;

  container.style.width = `${cols * CELL_SIZE}px`;
};

export function renderGrid(rows: number, cols: number): void {
  const container = document.getElementById("canvas");
  if (container === null) return;

  // 念のため、すでにあるマスを消してから作り直す。
  container.textContent = "";

  // キャンバスの幅を設定する
  setCanvasWidth(cols);

  for (let index = 0; index < totalCells; index++) {
    const cell = document.createElement("div");
    cell.className = "pixel-cell";
    container.appendChild(cell);
  }
}

// マスへのクリックイベントを結びつける関数を追加する
export const gridEventsBind = (): void => {
  const cells = document.getElementsByClassName("pixel-cell");
  
  for (let index = 0; index < totalCells; index++) {
    cells[index].addEventListener("click", () => {
      //PAINT_COLORを取得する。
      getPaintColor();
      // 1. データ（配列）を更新
      paintCell(index, PAINT_COLOR);
      // 2. 画面（DOM）の見た目を更新
      renderCell(index, PAINT_COLOR);
    });
  }
}

// ステップ1（最初の課題）: この関数を実装する。
//
// いまはマスをクリックすると Console に「塗ったマス: 5」と出るが、色は変わらない。
// この関数の中身が空だからで、ここに DOM 操作を書けばマスが塗られる。
//
// ヒント:
//  - 全マスは class="pixel-cell"。document.getElementsByClassName でまとめて取れる。
//  - その中の index 番目が、色を変えたいマス。
//  - 要素の背景色は style.backgroundColor で変えられる。
export function renderCell(index: number, color: string): void {
  // ステップ0 ではコンソールに座標が出るだけ。
  console.log("塗ったマス:", index);

  // TODO（ステップ1）: ここに DOM 操作を書いて、マスの色を変える。
  // 全マスで構成されるオブジェクトを定数にする
  const cells =  document.getElementsByClassName("pixel-cell");
  //押されたマスを定数にする
  const pushedcell = cells[index] as HTMLElement ;
  //押されたマスの背景色を変える。AIによるとifでpushedcellがあるときに動くようにしたほうがerrorを防げるらしい。
  if (pushedcell)
  pushedcell.style.backgroundColor = color;
}

// 拡張ポイント（ステップ2以降）。必要になったら関数を足す。
//  - カラーパレットの色見本を並べる: 色ボタンを document.createElement で作って表示する関数を足す。