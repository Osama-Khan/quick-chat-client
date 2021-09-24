import React from "react";
import "./chat.css";
import { formatTime } from "../../Helpers/date-time";
import socketService from "../../Services/socket.service";
import { Button, Card } from "react-bootstrap";
import { UserContext } from "../../Providers/user.provider";

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
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Room # {props.roomId}</span>
          <Button
            variant="danger"
            className="text-lg font-weight-bold"
            onClick={() => {
              socketService.socket.emit("leaveRoom", props.roomId);
              props.onLeave();
            }}
          >
            &times;
          </Button>
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
        <Card.Footer className="d-flex flex-direction-row p-1">
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
          <Button
            variant="primary"
            onClick={() => {
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
            Send
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}
