import { combineReducers } from "redux";
import { ActionType, Action } from "../actions/actions";
import Paper from "paper";

const reducer = (drawing: any = {}, action: Action): any => {
  switch (action.type) {
    case ActionType.draw:
      drawing = {
        path: new Paper.Path(),
        jsons: {},
        lastSeg: [],
        textItem: new Paper.PointText(new Paper.Point(20, 30)),
        segmentsToSend: {}
      };
      drawing.textItem.fillColor = new Paper.Color("black");
      drawing.textItem.content = "Click and drag to draw a line.";
      let removeItems = function removeItems(input: [], item: number) {
        var arr = [];
        for (var i = item - 1; i < input.length; i++) {
          arr.push(input[i]);
        }
        return arr;
      };
      let cutPath = function (up: boolean = false) {
        drawing.duration = Date.now() - drawing.start;
        if (drawing.duration < 100) {
          drawing.duration = 100;
        }
        var segmentCount = drawing.path.segments.length;
        drawing.textItem.content = "Segment count: " + segmentCount;
        // path.simplify(20);
        var newSegmentCount = drawing.path.segments.length;
        var difference = segmentCount - newSegmentCount;
        var percentage =
          100 - Math.round((newSegmentCount / segmentCount) * 100);
        drawing.textItem.content =
          difference +
          " of the " +
          segmentCount +
          " segments were removed. Saving " +
          percentage +
          "%";
        drawing.jsons = Paper.project.exportJSON({ asString: false });
        var segments =
          drawing.jsons[0][1]["children"][
            drawing.jsons[0][1]["children"].length - 1
          ][1]["segments"];

        if (drawing.lastCut !== 0) {
          drawing.segmentsToSend = removeItems(segments, drawing.lastCut);
        } else {
          drawing.segmentsToSend = segments;
        }

        if (up) {
          drawing.lastCut = 0;
        } else {
          drawing.start = Date.now();
          drawing.lastCut = segments.length;
        }
        console.log(JSON.stringify(segments));
        console.log(JSON.stringify(drawing.segmentsToSend));
        console.log(drawing.lastCut);
        drawing.toSend = JSON.stringify(drawing.segmentsToSend);
        // console.log(getByteCount(drawing.toSend) + " BYTES");
        // exportPath(toSend, duration);
      };

      Paper.view.onMouseDown = function (event) {
        drawing.path.strokeColor = new Paper.Color("black");
        drawing.path.strokeWidth = 3;
        drawing.start = Date.now();
        drawing.interval = setInterval(function () {
          cutPath();
        }, 500);
      };
      Paper.view.onMouseDrag = function (event) {
        drawing.path.add(event.point);
      };
      Paper.view.onMouseUp = function (event) {
        cutPath(true);
        clearInterval(drawing.interval);
      };

      Paper.install(window);

      return drawing;
    case ActionType.setUpServer:
      return drawing;
    case ActionType.exportPath:
      return drawing;
    case ActionType.cutPath:
      return drawing;
    case ActionType.clear:
      return drawing;
    case ActionType.changeSize:
      return drawing;
    case ActionType.changeColor:
      return drawing;
    case ActionType.toggleView:
      return drawing;
    default:
      return drawing;
  }
};

const reducers = combineReducers({
  drawing: reducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;