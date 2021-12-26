var paperscript = {};
var jsons;
var path;
var start;
var duration;
var lastCut = 0;
var lastSeg = [];
var interval;
var textItem;

function removeItems(input, item) {
  var arr = [];
  for (var i = item - 1; i < input.length; i++) {
    arr.push(input[i]);
  }
  return arr;
}
function getByteCount(s) {
  var count = 0,
    stringLength = s.length,
    i;
  s = String(s || "");
  for (i = 0; i < stringLength; i++) {
    var partCount = encodeURI(s[i]).split("%").length;
    count += partCount == 1 ? 1 : partCount - 1;
  }
  return count;
}
const drone = new Scaledrone("vDpjqEy7zBozqKlE");
var exportPath = function (path, duration) {
  drone.publish({
    room: "draw",
    message: {
      path: path,
      duration: duration
    }
  });
};

var setupInterval = setInterval(() => {
  if (typeof paperscript.view != "undefined") {
    clearInterval(setupInterval);
    textItem = new paper.PointText(new paper.Point(20, 30));
    textItem.fillColor = "black";
    textItem.content = "Click and drag to draw a line.";

    paperscript.view.onMouseDown = function (event) {
      path = new paper.Path();
      path.strokeColor = "black";
      start = Date.now();
      interval = setInterval(function () {
        cutPath();
      }, 500);
    };
    paperscript.view.onMouseDrag = function (event) {
      path.add(event.point);
    };
    paperscript.view.onMouseUp = function (event) {
      cutPath(true);
      clearInterval(interval);
    };
  }
}, 100);
function cutPath(up) {
  duration = Date.now() - start;
  if (duration < 100) {
    duration = 100;
  }
  var segmentCount = path.segments.length;
  textItem.content = "Segment count: " + segmentCount;
  // path.simplify(20);
  var newSegmentCount = path.segments.length;
  var difference = segmentCount - newSegmentCount;
  var percentage = 100 - Math.round((newSegmentCount / segmentCount) * 100);
  textItem.content =
    difference +
    " of the " +
    segmentCount +
    " segments were removed. Saving " +
    percentage +
    "%";
  jsons = paperscript.project.exportJSON({ asString: false });
  var segments =
    jsons[0][1]["children"][jsons[0][1]["children"].length - 1][1]["segments"];

  if (lastCut != 0) {
    segmentsToSend = removeItems(segments, lastCut);
  } else {
    segmentsToSend = segments;
  }

  if (up) {
    lastCut = 0;
  } else {
    start = Date.now();
    lastCut = segments.length;
  }

  console.log(JSON.stringify(segments));
  console.log(JSON.stringify(segmentsToSend));
  console.log(lastCut);
  toSend = JSON.stringify(segmentsToSend);
  console.log(getByteCount(toSend) + " BYTES");
  exportPath(toSend, duration);
}
