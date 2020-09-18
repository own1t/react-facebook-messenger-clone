import React, { useEffect, useState } from "react";

import FlipMove from "react-flip-move";

import Message from "./Message";

import db from "../firebase";
import firebase from "firebase";

import {
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import "./Messenger.css";

function Messenger() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your username"));
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <>
      <div className="messenger">
        <div className="messenger__header">
          <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
          <h2>Hello, {username ? username : "Unknown User"}</h2>
        </div>
        <form className="messenger__form">
          <FormControl className="messenger__formControl">
            {/* <InputLabel htmlFor="my-input">Enter Message</InputLabel> */}
            <Input
              className="messenger__input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Message"
            />
            <IconButton
              className="messenger__iconButton"
              type="submit"
              variant="contained"
              color="primary"
              disabled={!input}
              onClick={handleMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>

        <div className="messages">
          <FlipMove>
            {messages.map((message, idx) => (
              <Message key={idx} username={username} message={message} />
            ))}
          </FlipMove>
        </div>
      </div>
    </>
  );
}

export default Messenger;
