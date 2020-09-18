import React, { useEffect, useState } from "react";

import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

import Message from "./Message";

import db from "../firebase";

function Messenger() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages").onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your username"));
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();

    setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <>
      <div className="input">
        <h2>Hello, {username}</h2>
        <form>
          <FormControl>
            <InputLabel htmlFor="my-input">Enter Message</InputLabel>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!input}
              onClick={handleMessage}
            >
              Send Message
            </Button>
          </FormControl>
        </form>

        {messages.map((message) => (
          <Message username={username} message={message} />
        ))}
      </div>
    </>
  );
}

export default Messenger;
