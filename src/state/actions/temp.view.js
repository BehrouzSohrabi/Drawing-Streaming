`
<script type="text/paperscript" canvas="viewCanvas">
var path;
paper.Path.prototype.getPointAtPercent = function (percent) {
  if(this.length < 1){
    return this.getPointAt(0);
  }else{
    return this.getLocationAt(percent * this.length).getPoint();
  }
};
paper.install(window.paperscript);
</script>
`;

var paperscript = {};
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

var contents = [];
var i = 0;
const drone = new Scaledrone("vDpjqEy7zBozqKlE");
const room = drone.subscribe("draw");
room.on("open", (error) => {
  if (error) {
    return console.error(error);
  }
});
room.on("message", (data) => {
  console.log(data.data.path);
  console.log(getByteCount(JSON.stringify(data)) + " BYTES");
  contents[i] = {};
  // console.log(data);
  // duration in ms
  contents[i]["ease"] = Math.floor(Math.random() * 0.8) + 1.2;
  contents[i]["duration"] = data.data.duration;
  contents[i]["finished"] = false;
  // draw the line
  contents[i]["path"] = new paper.Path();
  contents[i]["path"].importJSON([
    "Path",
    { segments: JSON.parse(data.data.path) }
  ]);
  contents[i]["path"].dashArray = [
    contents[i]["path"].length,
    contents[i]["path"].length
  ];
  // draw the circle
  contents[i]["circle"] = new paper.Path.Circle(0, 100, 4);
  contents[i]["endTime"] = null;
  i++;
});
// setup
var setupInterval = setInterval(() => {
  if (typeof paperscript.view != "undefined") {
    clearInterval(setupInterval);
    paperscript.view.onFrame = function (event) {
      for (let i = 0; i < contents.length; i++) {
        if (i == 0 || (i > 0 && contents[i - 1]["finished"])) {
          var now = Date.now();
          contents[i]["path"].strokeColor = "#000";
          contents[i]["circle"].strokeColor = "#000";
          if (!contents[i]["endTime"]) {
            contents[i]["endTime"] = now + contents[i]["duration"];
          }
          if (now < contents[i]["endTime"]) {
            var percent =
              (contents[i]["duration"] - (contents[i]["endTime"] - now)) /
              contents[i]["duration"];
            percent = Math.pow(percent, contents[i]["ease"]);
            contents[i]["circle"].position = contents[i][
              "path"
            ].getPointAtPercent(percent);
            contents[i]["path"].dashOffset =
              -percent * contents[i]["path"].length +
              contents[i]["path"].length;
          } else {
            contents[i]["path"].dashOffset = 0;
            contents[i]["circle"].visible = false;
            contents[i]["finished"] = true;
          }
        }
      }
    };
  }
}, 100);
