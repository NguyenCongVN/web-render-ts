import React from "react";
import { connect, Socket } from "socket.io-client";
export const socket = connect(
  `http://${process.env.REACT_APP_SOCKET_IO_SERVER_IP}:${process.env.REACT_APP_SOCKET_IO_SERVER_PORT}`
);

export const SocketContext = React.createContext<null | Socket>(null);
