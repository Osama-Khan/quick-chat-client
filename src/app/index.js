import { useEffect, useState } from "react";
import Chat from "./Screens/ChatScreen";
import Home from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import socketService from "./Services/socket.service";
import UserProvider from "./Providers/user.provider";

export default function App() {
  const [roomId, setRoomId] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    socketService.socket.on("loginSuccess", (user) => {
      setUser(user);
    });
  });
  return (
    <div className="container">
      {user ? (
        <UserProvider value={user}>
          {roomId ? (
            <Chat roomId={roomId} onLeave={() => setRoomId(undefined)} />
          ) : (
            <Home onJoinRoom={(id) => setRoomId(id)} />
          )}{" "}
        </UserProvider>
      ) : (
        <LoginScreen />
      )}
    </div>
  );
}
