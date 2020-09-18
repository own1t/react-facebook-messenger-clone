import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

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
    </>
  );
});

export default Message;
