// データ層 (canvas.ts)
// ドット絵キャンバスのデータと操作関数を定義する層。
// どのマスが何色かという情報とその操作だけに専念し、画面表示(DOM操作)はしない。
// この層は完成済み。まずは読んで理解する。

// 数字を変更できるように変数で行数と列数の初期値をそれぞれ定義する
export let rows = 16;
export let cols = 16;
export let totalCells: number;
// 変数を使ってマス目の総数を計算する
export const grid_creation = (newRows: number, newCols: number) => {
  rows = newRows;
  cols = newCols;
  totalCells = rows * cols;
  console.log(`グリッド更新: ${rows}行 × ${cols}列（合計: ${totalCells}マス）`);

  // 3と4の処理（古いマスの削除 ＋ 新しいマスの生成・描画）をここに書く
};

// 塗るときの色と、空（消えている）マスの色。
export const DEFAULT_COLOR = "#000000"; // 黒
export const EMPTY_COLOR = "#ffffff"; // 白
export let PAINT_COLOR = DEFAULT_COLOR; // 塗るときの色
export const PALETTE_COLORS = [
  "#000000", // 黒
  "#ffffff", // 白
  "#ff0000", // 赤
  "#00ff00", // 緑
  "#0000ff", // 青
];

// 各マスの色を1次元配列で持つ（長さは rows×cols）。
// export していないので外部からは直接触れず、下の関数を通して操作する。
let cells: string[] = [];

// 全マスを空(白)に戻す。
export function clearCanvas(): void {
  cells = [];
  for (let i = 0; i < totalCells; i++) {
    cells.push(EMPTY_COLOR);
  }
  console.log("キャンバスを全消去しました");
}

// index 番目のマスを color で塗る。
export function paintCell(index: number, color: string): void {
  cells[index] = color;
}

// index 番目のマスの色を返す。
export function getCellColor(index: number): string {
  return cells[index];
}

// 拡張ポイント（ステップ2以降）。必要になったら足す。
//  - 塗る色を変える: 上の DEFAULT_COLOR を別の色に変える（新しい関数は不要）。
//  - Undo / Redo: 塗った操作を配列で記録して、元に戻す・やり直す関数を足す。

// 色を取得する関数を export する
export function getPaintColor() {
  return PAINT_COLOR;
}

// 色を変更する関数を用意しておく
export function setPaintColor(newColor: string) {
  PAINT_COLOR = newColor;
  console.log("塗るときの色:", PAINT_COLOR);
}