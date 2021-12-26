interface setUpServer {
  type: ActionType.setUpServer;
}

interface exportPath {
  type: ActionType.exportPath;
  payload: Object;
}

interface draw {
  type: ActionType.draw;
}

interface cutPath {
  type: ActionType.cutPath;
  payload?: boolean;
}

interface clear {
  type: ActionType.clear;
}

interface changeSize {
  type: ActionType.changeSize;
  payload: number;
}

interface changeColor {
  type: ActionType.changeColor;
  payload: string;
}

interface toggleView {
  type: ActionType.toggleView;
  payload?: boolean;
}

export type Action =
  | setUpServer
  | draw
  | cutPath
  | exportPath
  | clear
  | changeSize
  | changeColor
  | toggleView;

export enum ActionType {
  setUpServer = "setUpServer",
  exportPath = "exportPath",
  draw = "draw",
  cutPath = "cutPath",
  clear = "clear",
  changeSize = "changeSize",
  changeColor = "changeColor",
  toggleView = "toggleView"
}
