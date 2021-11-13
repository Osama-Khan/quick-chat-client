import React, { useEffect, useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import {
  FaCheckCircle,
  FaImage,
  FaKey,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import authService from "../../Services/auth.service";
import socketService from "../../Services/socket.service";

export default function LoginScreen() {
  const [data, setData] = useState({ name: "", password: "", profile: "" });
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    socketService.socket.on("loginFailed", (text) => {
      setMessage({ text, isError: true });
    });
    socketService.socket.on("registerFailed", (text) => {
      setMessage({ text, isError: true });
    });
    socketService.socket.on("registerSuccess", (user) => {
      setMessage({
        text: "Successfully registered as " + user.name,
        isError: false,
      });
    });
  }, []);

  const handleChange = (propName, propValue) => {
    const d = data;
    d[propName] = propValue;
    setData({ ...d });
    setMessage({ ...message, text: "" });
  };

  return (
    <Card className="m-auto">
      <Card.Header>
        <span
          className={`clickable m-1 ${tab === 0 ? "active" : "inactive"}`}
          onClick={() => setTab(0)}
        >
          Login
        </span>
        <span
          className={`clickable m-1 ${tab === 1 ? "active" : "inactive"}`}
          onClick={() => setTab(1)}
        >
          Register
        </span>
      </Card.Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (isFormValid(data)) {
            tab === 0 ? authService.login(data) : authService.register(data);
          } else {
            setMessage({ text: "Please fill in the fields!", isError: true });
          }
        }}
      >
        <Card.Body>
          <FormGroup className="d-flex flex-direction-row align-items-center">
            <FaUser className="m-2" />
            <input
              placeholder="Username..."
              required
              className="my-2"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormGroup>
          <FormGroup className="d-flex flex-direction-row align-items-center">
            <FaKey className="m-2" />
            <input
              placeholder="Password..."
              required
              type="password"
              className="my-2"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </FormGroup>
          {tab === 1 ? (
            <FormGroup className="d-flex flex-direction-row align-items-center">
              <FaImage className="m-2" />
              <input
                placeholder="Profile picture link..."
                className="my-2"
                onChange={(e) => handleChange("profile", e.target.value)}
              />
            </FormGroup>
          ) : (
            ""
          )}
          {message.text ? (
            <div
              className={`${
                message.isError ? "text-danger" : "text-success"
              } text-sm d-flex align-items-center`}
            >
              {message.isError ? (
                <FaTimesCircle className="m-1" />
              ) : (
                <FaCheckCircle className="m-1" />
              )}
              <span>{message.text}</span>
            </div>
          ) : (
            ""
          )}
        </Card.Body>
        {tab === 1 ? (
          <Button
            type="submit"
            className="w-100 rounded-0"
            disabled={!isFormValid(data)}
          >
            Register
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-100 rounded-0"
            disabled={!isFormValid(data)}
          >
            Login
          </Button>
        )}
      </Form>
    </Card>
  );
}

const isFormValid = (data) => {
  return data.name && data.password;
};
