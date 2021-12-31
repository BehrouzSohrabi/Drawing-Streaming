import { Types } from "./Types"

const drone = new window.Scaledrone("vDpjqEy7zBozqKlE");
const roomName = "draw";

export const exportPath = (path: any, duration: number, color: string, width: number) => {
    drone.publish({
        room: roomName,
        message: {
            path: path,
            duration: duration,
            color: color,
            width: width
        },
    });
};

export const room = drone.subscribe(roomName);