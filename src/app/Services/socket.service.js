import { io, Socket } from "socket.io-client";

/** Provides the socket connected to quick chat server */
class SocketService {
  /** @type {Socket} The socket connected to the server */
  socket;

  constructor() {
    this.socket = new io(process.env.REACT_APP_SERVER_URL);
  }
}

export default new SocketService();
