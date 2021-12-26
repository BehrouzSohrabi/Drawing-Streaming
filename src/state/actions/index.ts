import { ActionType, Action } from "./actions";
import { Dispatch } from "redux";

export const setUpServer = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.setUpServer
    });
  };
};

export const exportPath = (path: Object, duration: number, room: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.exportPath,
      payload: {
        pah: path,
        duration: duration,
        room: room
      }
    });
  };
};

export const draw = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.draw
    });
  };
};

export const cutPath = (up: boolean = false) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.cutPath,
      payload: up
    });
  };
};

export const clear = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.clear
    });
  };
};

export const changeSize = (size: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.changeSize,
      payload: size
    });
  };
};

export const changeColor = (color: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.changeColor,
      payload: color
    });
  };
};

export const toggleView = (viewPort: boolean = false) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.toggleView,
      payload: viewPort
    });
  };
};
