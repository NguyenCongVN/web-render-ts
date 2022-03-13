import { Socket } from "socket.io-client";
import { SocketEvents } from "../enums/SocketEvents";
export const StartAttack = (
  socket: Socket,
  configScanFile: string,
  topologyFile: string,
  connectedMap: string
) => {
  socket.emit(SocketEvents.START_ATTACK, {
    configScanFile,
    topologyFile,
    connectedMap,
  });
};
