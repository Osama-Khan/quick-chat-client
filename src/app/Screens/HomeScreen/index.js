import React, { useEffect, useState } from "react";
import socketService from "../../Services/socket.service";

/** @param {{onJoinRoom: (id) => void}} props */
export default function Home(props) {
  const [id, setId] = useState("");
  useEffect(() => {
    socketService.socket.on("joinedRoom", (id) => {
      props.onJoinRoom(id);
    });
  }, [props]);
  return (
    <div className="card">
      <div className="card-header">Home</div>
      <div className="card-body row">
        <input
          type="text"
          placeholder="Enter room id..."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="btn btn-dark col-sm-4 col-md-2 p-2 mx-auto my-2 d-flex flex-column"
          disabled={!id}
          onClick={() => {
            socketService.socket.emit("joinRoom", id);
          }}
        >
          <img
            src="/assets/images/icon-join.png"
            alt="join-icon"
            style={{ height: 64, width: "auto", objectFit: "contain" }}
          />
          Join room
        </button>
        <button
          className="btn btn-dark col-sm-4 col-md-2 p-2 mx-auto my-2 d-flex flex-column"
          onClick={() => {
            socketService.socket.emit("createRoom");
          }}
        >
          <img
            src="/assets/images/icon-plus.png"
            alt="create-icon"
            style={{ height: 64, width: "auto", objectFit: "contain" }}
          />
          Create room
        </button>
      </div>
    </div>
  );
}
