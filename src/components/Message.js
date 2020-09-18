import React, { forwardRef, useRef, useEffect } from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [message]);

  return (
    <>
      <div className={`message ${isUser && "message__user"}`} ref={ref}>
        <Card className={isUser ? "message__userCard" : "message__guestCard"}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {!isUser && `${message.username || "Unknown User"}: `}{" "}
              {message.message}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div ref={messagesEndRef} />
    </>
  );
});

export default Message;
