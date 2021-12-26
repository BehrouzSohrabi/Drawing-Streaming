import React, { useEffect } from "react";
import Paper from "paper";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../state/actions";
import { RootState } from "../state/reducers";

export default function Canvas(props: any) {
  const path = useSelector((state: RootState) => state.drawing);
  const dispatch = useDispatch();
  const {
    draw,
    clear,
    changeSize,
    changeColor,
    toggleView
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    Paper.setup("drawingCanvas");
    Paper.setup("viewPort");
    draw();
  }, []);

  return (
    <>
      <canvas {...props} id="drawingCanvas" resize="true" />
      <canvas {...props} id="viewPort" resize="true" />
      <div className="controls">
        <h1>length of drawing</h1>
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => changeSize(3)}>Change Size</button>
        <button onClick={() => changeColor("Red")}>Change Color</button>
        <button onClick={() => toggleView()}>Toggle View</button>
      </div>
    </>
  );
}
