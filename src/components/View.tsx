import React, { useEffect } from 'react';
import Paper from 'paper';
import { getByteCount, removeItems } from './../modules/Helpers';
import { room } from './../modules/Server';

const View = (props: any) => {
	let contents: any = [];
	let index: number = 0;

	let listen = () => {
		room.on('open', (error: any) => {
			if (error) {
				return console.error(error);
			}
		});

		room.on('message', (data: any) => {
			console.log(data);
			console.log(getByteCount(JSON.stringify(data)) + ' BYTES');
			// defining vars
			let path = data.data.path;
			let duration = data.data.duration;
			let penColor = data.data.color;
			let penWidth = data.data.width;
			// setting up path to contents
			contents[index] = {
				ease: Math.floor(Math.random() * 0.8) + 1.2, // duration in ms
				duration: duration,
				finished: false,
				path: new Paper.Path(),
				circle: new Paper.Path.Circle(new Paper.Point(0, 0), penWidth * 5),
				endTime: null
			};
			// draw the line
			contents[index]['path'].strokeColor = new Paper.Color(penColor);
			contents[index]['path'].strokeWidth = penWidth;
			contents[index]['path'].importJSON([
				'Path',
				{ segments: JSON.parse(path) },
			]);
			contents[index]['path'].dashArray = [
				contents[index]['path'].length,
				contents[index]['path'].length,
			];
			// draw the circle
			contents[index]['circle'].strokeColor = new Paper.Color(penColor);
			// wait for next
			index++;
		});

		Paper.view.onFrame = function() {
			for (let i = 0; i < contents.length; i++) {
				if (i == 0 || (i > 0 && contents[i - 1]['finished'])) {
					let now = Date.now();
					let thisPath = contents[i];

					if (!thisPath['endTime']) {
						thisPath['endTime'] = now + thisPath['duration'];
					}
					if (now < thisPath['endTime']) {
						let percent =
							(thisPath['duration'] -
								(thisPath['endTime'] - now)) /
							thisPath['duration'];

						percent = Math.pow(percent, thisPath['ease']);
						let pathLength = thisPath['path'].length;

						let circlePosition =
							pathLength < 1
								? thisPath['path'].getPointAt(0)
								: thisPath['path']
										.getLocationAt(percent * pathLength)
										.getPoint();

						thisPath['circle'].position = circlePosition;

						thisPath['path'].dashOffset =
							-percent * pathLength + pathLength;
					} else {
						thisPath['path'].dashOffset = 0;
						thisPath['circle'].visible = false;
						thisPath['finished'] = true;
					}
				}
			}
		};
	};

	useEffect(() => {
		Paper.setup('viewPort');
		Paper.install(window);
		listen();
	}, []);
	return (
		<div className="View">
			<canvas {...props} id="viewPort" resize="true" />
		</div>
	);
};

export default View;
