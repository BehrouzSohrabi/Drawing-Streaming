import React, { useEffect } from 'react';
import Paper from 'paper';
import { getByteCount, removeItems } from './../modules/Helpers';
import { exportPath } from './../modules/Server';

const Canvas = (props: any) => {
	let jsons: any;
	let path: any;
	let start: any;
	let duration;
	let lastCut = 0;
	let interval: any;
	let textItem: any;
	let segmentsToSend: any;
	let toSend: any;
	let penColor: string;
	let penWidth: number;
	let draw = () => {
		textItem = new paper.PointText(new paper.Point(20, 70));
		textItem.fillColor = new Paper.Color('black');
		textItem.content = 'Click and drag to draw a line.';

		Paper.view.onMouseDown = function() {
			
			penColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
			penWidth = 20 * Math.random();

			path = new paper.Path();
			path.strokeColor = new Paper.Color(penColor);
			path.strokeWidth = penWidth;
			start = Date.now();
		};
		Paper.view.onMouseDrag = function(event: any) {
			path.add(event.point);
		};
		Paper.view.onMouseUp = function() {
			cutPath(true);
			clearInterval(interval);
		};

		let cutPath = function(up: boolean = false) {
			duration = Date.now() - start;
			if (duration < 100) {
				duration = 100;
			}
			let segmentCount = path.segments.length;
			textItem.content = 'Segment count: ' + segmentCount;
			path.simplify();
			let newSegmentCount = path.segments.length;
			let difference = segmentCount - newSegmentCount;
			let percentage =
				100 - Math.round((newSegmentCount / segmentCount) * 100);
			textItem.content =
				difference +
				' of the ' +
				segmentCount +
				' segments were removed. Saving ' +
				percentage +
				'%';
			jsons = Paper.project.exportJSON({ asString: false });
			let segments =
				jsons[0][1]['children'][jsons[0][1]['children'].length - 1][1][
					'segments'
				];

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

			toSend = JSON.stringify(segmentsToSend);
			exportPath(toSend, duration, penColor, penWidth);
			
			console.log(getByteCount(toSend) + ' BYTES');
			console.log(toSend, duration, penColor, penWidth);
		};
	};
	useEffect(() => {
		Paper.setup('drawingCanvas');
		Paper.install(window);
		draw();
	}, []);
	return (
		<div className="Canvas">
			<canvas {...props} id="drawingCanvas" resize="true" />
		</div>
	);
};

export default Canvas;
