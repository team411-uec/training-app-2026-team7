import { renderCell } from "./render";
import { totalCells, paintCell,  getPaintColor} from "./canvas";

export let isMouseDown = false;

// マウスが押されたときに ismouseup を false にする
const upevent = () => {
    window.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
};

const downevent = (cell: HTMLElement, index: number) => {
    cell.addEventListener("mousedown", () => {
        isMouseDown = true;
        //PAINT_COLORを取得する。
        const color = getPaintColor(); 
        paintCell(index, color);
        renderCell(index, color);
    });
};

const enterEvent = (cell: HTMLElement, index: number) => {
    cell.addEventListener("mouseenter", () => {
        if (isMouseDown === true) {
            //PAINT_COLORを取得する。
            const color = getPaintColor();
            // 1. データ（配列）を更新
            paintCell(index, color);
            // 2. 画面（DOM）の見た目を更新
            renderCell(index, color);
        }
    });
};

export const dragEventsBind = (): void => {
    // 全マスをまとめて取得する。renderCellが生成したマスを取得。
    const cells = document.getElementsByClassName("pixel-cell");
    //単発クリックと持続押しの両方に対応するため、mousedownとmouseenterのイベントを登録する。
    for (let index = 0; index < totalCells; index++) {
        const cell = cells[index] as HTMLElement;
        downevent(cell, index);
        enterEvent(cell, index);
    }
};

export const gridEventsBind = (): void => {
    upevent();
    dragEventsBind();
};