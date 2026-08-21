// データ層 (canvas.ts)
// ドット絵キャンバスのデータと操作関数を定義する層。
// どのマスが何色かという情報とその操作だけに専念し、画面表示(DOM操作)はしない。
// この層は完成済み。まずは読んで理解する。

// 一辺のマス目の数（16 なら 16×16 = 256 マス）。
export const GRID_SIZE = 16;

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

// 各マスの色を1次元配列で持つ（長さは GRID_SIZE×GRID_SIZE）。
// export していないので外部からは直接触れず、下の関数を通して操作する。
let cells: string[] = [];

// 全マスを空(白)に戻す。
export function clearCanvas(): void {
  cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
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