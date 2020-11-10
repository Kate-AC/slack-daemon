import * as React from "react";
import { Message } from "interfaces/Common";

interface Props {
  headerColor: string;
  bodyColor: string;
  message: Message;
}

export default function MessageBox(props: Props): React.ReactElement {
  const { headerColor, bodyColor, message } = props;
  const {
    id,
    permalink,
    username,
    channelName,
    pretext,
    parentText,
    text,
    title,
    date,
  } = message;

  return (
    <div className="message-box">
      <span style={{ color: headerColor }}>
        【{date}】 {username}
        {" / #"}
        {channelName}:
{" "}
      </span>
      <span style={{ color: bodyColor }}>
        {pretext}
        {parentText}
        {text}
        {title}
      </span>
    </div>
  );
}
