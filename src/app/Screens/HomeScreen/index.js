import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Row,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import {
  FaChevronRight,
  FaExclamationCircle,
  FaPowerOff,
} from "react-icons/fa";
import socketService from "../../Services/socket.service";

/** @param {{onJoinRoom: (id) => void}} props */
export default function Home(props) {
  const [id, setId] = useState("");
  const [modalShown, setModalShown] = useState(false);
  useEffect(() => {
    socketService.socket.on("joinedRoom", (id) => {
      props.onJoinRoom(id);
    });
  }, [props]);
  return (
    <>
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
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Button
              type="submit"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <FaChevronRight />
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-0">
          <Button
            variant="danger"
            className="w-25 rounded-0"
            onClick={() => setModalShown(true)}
          >
            <FaPowerOff className="m-1" />
          </Button>
          <Button
            variant="dark"
            className="w-75 rounded-0"
            onClick={() => {
              socketService.socket.emit("createRoom");
            }}
          >
            Personal Room
            <FaChevronRight className="m-1" />
          </Button>
        </Card.Footer>
      </Card>
      <Modal show={modalShown} onHide={() => setModalShown(false)}>
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Row>
            <FaExclamationCircle size="48" className="col-2" />
            <p className="col-10">Are you sure you want to log out?</p>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => (window.location.href = "/")}>Yes</Button>
          <Button variant="secondary" onClick={() => setModalShown(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
