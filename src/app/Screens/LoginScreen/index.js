import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import authService from "../../Services/auth.service";

export default function LoginScreen() {
  const [txtUser, txtPass] = [useRef(), useRef()];
  return (
    <Card className="m-auto">
      <Card.Header>Login</Card.Header>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Card.Body>
          <input placeholder="Username..." className="my-2" ref={txtUser} />
          <input
            placeholder="Password..."
            type="password"
            className="my-2"
            ref={txtPass}
          />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={() => {
              const user = {
                name: txtUser.current.value,
                password: txtPass.current.value,
              };
              authService.register(user);
            }}
          >
            Register
          </Button>
          <Button
            type="submit"
            onClick={() => {
              const user = {
                name: txtUser.current.value,
                password: txtPass.current.value,
              };
              authService.login(user);
            }}
          >
            Login
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
