import * as React from "react";
import { Message } from "../interfaces/Common";
import MessageBox from "./MessageBox";
import startDragAndDrop from "../assets/js/ElementDragAndDrop";

interface Props {
  moving: boolean;
  nowLoading: boolean;
  messages: Message[];
}

type State = {
  windowTop: number;
  windowLeft: number;
  opacity: number;
  width: number;
  height: number;
  backgroundColor: string;
  fontSize: number;
  headerColor: string;
  bodyColor: string;
  hidden: boolean;
};

export default class Window extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      windowTop: 0,
      windowLeft: 0,
      opacity: 20,
      width: 300,
      height: 300,
      backgroundColor: "#000000",
      fontSize: 14,
      headerColor: "ffffff",
      bodyColor: "#ffffff",
      hidden: false,
    };

    this.loadParams();
  }

  componentDidMount(): void {
    startDragAndDrop();
  }

  loadParams(): void {
    setInterval(() => {
      chrome.storage.local.get(
        ["params", "windowTop", "windowLeft"],
        (values) => {
          const { windowTop, windowLeft, current_iid } = values;
          const {
            opacity,
            width,
            height,
            backgroundColor,
            fontSize,
            headerColor,
            bodyColor,
            hidden,
          } = values.params;
          this.setState({
            windowTop,
            windowLeft,
            opacity,
            width,
            height,
            backgroundColor,
            fontSize,
            headerColor,
            bodyColor,
            hidden,
          });
        }
      );
    }, 500);
  }

  render(): React.ReactElement {
    const { messages, nowLoading, moving } = this.props;

    const imageSrc = moving ? chrome.runtime.getURL("app/bundle/images/skin1-b.png") : chrome.runtime.getURL("app/bundle/images/skin1-a.png");

    const {
      windowTop,
      windowLeft,
      opacity,
      width,
      height,
      backgroundColor,
      fontSize,
      headerColor,
      bodyColor,
      hidden,
    } = this.state;

    return (
      <article
        id="slack-window"
        className="skin-1"
        style={{
          top: windowTop,
          left: windowLeft,
          width: `${width}px`,
          height: `${height}px`,
          display: nowLoading || hidden ? "none" : "block",
          fontSize: `${fontSize}px`,
        }}
      >
        <div className="wrapper">
          <div
            className="messages"
            style={{
              height: `${height}px`,
            }}
          >
            <div className="messages-inner">
              {messages.map((message: Message) => (
                <MessageBox
                  key={message.id}
                  message={message}
                  headerColor={headerColor}
                  bodyColor={bodyColor}
                />
              ))}
            </div>
          </div>
          <div
            className="background-panel"
            style={{
              backgroundColor,
              boxShadow: `0 0 1.5rem 1.5rem ${backgroundColor}`,
              opacity: Math.abs(opacity - 100) / 100,
            }}
          />
          <div className="image">
            <img src={imageSrc} />
          </div>
        </div>
      </article>
    );
  }
}
