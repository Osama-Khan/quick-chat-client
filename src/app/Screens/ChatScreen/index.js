import React from "react";
import "./chat.css";
import { formatTime } from "../../Helpers/date-time";
import socketService from "../../Services/socket.service";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { UserContext } from "../../Providers/user.provider";
import { FaChevronLeft, FaPaperPlane } from "react-icons/fa";

/** @param {{roomId: string; onLeave: () => void}} props */
export default class Chat extends React.Component {
  static contextType = UserContext;
  state = { message: "", messages: [] };

  componentDidMount() {
    socketService.socket.on("receiveMessage", this.addMessage);
  }

  addMessage = (message, clearInput = false) => {
    const m = this.state.messages.concat(message);
    console.log(m.map((m) => message));
    this.setState({
      message: clearInput ? "" : this.state.message,
      messages: m,
    });
  };

  render() {
    const user = this.context;
    const messages = this.state.messages,
      props = this.props;

    return (
      <Card className="d-flex" style={{ height: "100vh" }}>
        <Card.Header className="d-flex justify-content-between">
          <Button
            variant="secondary"
            className="text-lg font-weight-bold"
            onClick={() => {
              socketService.socket.emit("leaveRoom", props.roomId);
              props.onLeave();
            }}
          >
            <FaChevronLeft />
          </Button>
          <Badge className="ml-2 my-auto">{props.roomId}</Badge>
        </Card.Header>
        <Card.Body className="overflow-scroll d-flex flex-column">
          {messages.map((m, i) => {
            const senderSameAsLast =
              i > 0 && messages[i - 1].sender._id === m.sender._id;
            const isOwn = m.sender._id === user._id;
            return (
              <div className="d-flex flex-column" key={m.time}>
                <div className={isOwn ? "align-self-end" : "align-self-start"}>
                  {isOwn || senderSameAsLast ? (
                    <></>
                  ) : (
                    <small className="text-muted">{m.sender.name}</small>
                  )}
                  <div className="d-flex flex-row">
                    {!isOwn && (
                      <img
                        src={m.sender.profile}
                        alt={m.sender.name + "'s profile"}
                        width="32"
                        height="32"
                        className="my-auto rounded-circle"
                      />
                    )}
                    <div className={`message${isOwn ? " message-own" : ""}`}>
                      {m.message}
                      <small className="time">{formatTime(m.time)}</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Card.Body>
        <Card.Footer className="p-1">
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              socketService.socket.emit(
                "sendMessage",
                this.state.message,
                props.roomId
              );
              this.addMessage(
                {
                  message: this.state.message,
                  sender: user,
                  time: new Date(),
                },
                true
              );
            }}
          >
            <input
              type="text"
              className="mx-1"
              style={{ width: "auto", flexGrow: 1 }}
              value={this.state.message}
              onChange={(e) =>
                this.setState({ ...this.state, message: e.target.value })
              }
              placeholder="Type a message..."
            />
            <Button variant="primary" type="submit">
              <FaPaperPlane />
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    );
  }
}
