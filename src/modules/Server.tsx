import { Types } from "./Types"

const drone = new window.Scaledrone("vDpjqEy7zBozqKlE");
const roomName = "draw";

export const exportPath = (path: any, duration: number) => {
    drone.publish({
        room: roomName,
        message: {
            path: path,
            duration: duration,
        },
    });
};

export const room = drone.subscribe(roomName);