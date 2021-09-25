import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaChevronRight, FaPlus, FaPowerOff } from "react-icons/fa";
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
    <Card className="card mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header>Home</Card.Header>
      <Card.Body>
        <Form
          className="justify-content-between d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            socketService.socket.emit("joinRoom", id);
          }}
        >
          <input
            type="text"
            placeholder="Enter room id..."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button type="submit">
            <FaChevronRight />
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <a href="/">
          <Button variant="danger">
            <FaPowerOff />
          </Button>
        </a>
        <Button
          variant="dark"
          onClick={() => {
            socketService.socket.emit("createRoom");
          }}
        >
          <FaPlus className="m-1" />
          Create room
        </Button>
      </Card.Footer>
    </Card>
  );
}
