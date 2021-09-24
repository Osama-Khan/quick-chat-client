import socketService from "./socket.service";

/** Provides user authentication methods */
class AuthService {
  /** Sends login event to the server with the given user
   * @param {{username: string; password: string}} user
   */
  login(user) {
    socketService.socket.emit("login", user);
  }

  /** Sends register event to the server with the given user
   * @param {{username: string; password: string; profile?: string}} user
   */
  register(user) {
    socketService.socket.emit("register", user);
  }
}

export default new AuthService();
