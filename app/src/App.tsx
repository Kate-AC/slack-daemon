import * as React from "react";
import Window from "./components/Window";
import { Message } from "./interfaces/Common";

type Props = {};

interface State {
  nowLoading: boolean;
  messages: Message[];
}

interface Match {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default class App extends React.Component<Props, State> {
  static timeStampToDate(timeStamp: number): string {
    const d = new Date(timeStamp * 1000);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

    return `${year}年${month}月${day}日${hour}:${min}`;
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      nowLoading: true,
      messages: [],
    };
  }

  componentDidMount(): void {
    chrome.runtime.onMessage.addListener(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (results: any) => {
        const { messages } = results.data;

        const array: Message[] = [];

        // TODO: 綺麗にしてほしい（希望）
        messages.matches.forEach((item: Match) => {
          const { iid, username, permalink, ts } = item;
          const { name } = item.channel;
          const parentText = item.text;

          let pretext = "";
          let text = "";
          let title = "";

          if (typeof item.attachments !== "undefined") {
            pretext = item.attachments[0].pretext;
            text = item.attachments[0].text;
            title = item.attachments[0].title;
          }

          array.push({
            id: iid,
            channelName: name,
            permalink,
            username: username || "",
            pretext: pretext || "",
            text: text || "",
            parentText: parentText || "",
            title: title || "",
            date: App.timeStampToDate(Math.floor(ts)),
          });
        });

        this.setState({ nowLoading: false, messages: array });
      }
    );
  }

  render(): React.ReactElement {
    const { messages, nowLoading } = this.state;

    return <Window nowLoading={nowLoading} messages={messages} />;
  }
}
