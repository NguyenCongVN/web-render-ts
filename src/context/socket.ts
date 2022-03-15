import React from "react";
import { connect, Socket } from "socket.io-client";

let socketConnection: Socket = connect(
  `http://${process.env.REACT_APP_SOCKET_IO_SERVER_IP}:${process.env.REACT_APP_SOCKET_IO_SERVER_PORT}`,
  { reconnection: true }
);

export const socket = socketConnection;

export const SocketContext = React.createContext<undefined | Socket>(undefined);
