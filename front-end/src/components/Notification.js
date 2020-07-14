import React from "react";

const Notification = ({ message: { text, type } }) => {
  if (text) {
    return <div className={`${type} notif`}>{text}</div>;
  }

  return null;
};

export default Notification;
