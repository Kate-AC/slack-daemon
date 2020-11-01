import * as React from "react";
import ReactDOM from "react-dom";

type Props = {};

interface State {
  status: number;
  errorMessage: string;
}

interface Status {
  state: string;
}

interface Params {
  [key: string]: any;
}

export default class ConfigWindow extends React.Component<Props, State> {
  private saveButtonRef: React.RefObject<HTMLButtonElement> = React.createRef();

  TYPE_NEUTRAL = 100;

  TYPE_SUCCESS = 200;

  TYPE_ERROR = 300;

  constructor(props: Props) {
    super(props);

    this.state = {
      status: this.TYPE_NEUTRAL,
      errorMessage: "",
    };
  }

  componentDidMount(): void {
    this.initForm();
    this.setButtonEvent();
  }

  initForm(): void {
    chrome.storage.local.get(["params"], (values) => {
      const options = document.querySelector("#options") as HTMLFormElement;

      if (options === null) return;

      const { elements } = options;
      const {
        slackToken,
        query,
        opacity,
        width,
        height,
        fontSize,
        backgroundColor,
        headerColor,
        bodyColor,
        hidden,
      } = values.params;

      (elements[0] as HTMLInputElement).value = slackToken;
      (elements[1] as HTMLInputElement).value = query;
      (elements[2] as HTMLInputElement).value = opacity;
      (elements[3] as HTMLInputElement).value = width;
      (elements[4] as HTMLInputElement).value = height;
      (elements[5] as HTMLInputElement).value = fontSize;
      (elements[6] as HTMLInputElement).value = backgroundColor;
      (elements[7] as HTMLInputElement).value = headerColor;
      (elements[8] as HTMLInputElement).value = bodyColor;
      (elements[9] as HTMLInputElement).checked = hidden;
    });
  }

  setButtonEvent(): void {
    const saveButton = this.saveButtonRef.current;

    if (saveButton === null) return;

    saveButton.addEventListener("click", () => {
      const options = document.querySelector("#options") as HTMLFormElement;

      if (options === null) return;

      const { elements } = options;

      const params = {
        slackToken: (elements[0] as HTMLInputElement).value,
        query: (elements[1] as HTMLInputElement).value,
        opacity: (elements[2] as HTMLInputElement).value,
        width: (elements[3] as HTMLInputElement).value,
        height: (elements[4] as HTMLInputElement).value,
        fontSize: (elements[5] as HTMLInputElement).value,
        backgroundColor: (elements[6] as HTMLInputElement).value,
        headerColor: (elements[7] as HTMLInputElement).value,
        bodyColor: (elements[8] as HTMLInputElement).value,
        hidden: (elements[9] as HTMLInputElement).checked,
      };

      try {
        this.validateOptions(params);

        chrome.storage.local.set({ params });
        this.setState({ status: this.TYPE_SUCCESS });
        this.setState({ errorMessage: "" });
      } catch (e) {
        this.setState({ status: this.TYPE_ERROR });
        this.setState({ errorMessage: e.message });
      }
    });
  }

  validateOptions(params: Params): void {
    if (params.slackToken.length < 1)
      throw new Error("SlackTokenを入力して下さい。");
    if (params.query.length < 1)
      throw new Error("検索文字列を入力して下さい。");
    if (parseInt(params.opacity, 10) < 0 || parseInt(params.opacity, 10) > 100)
      throw new Error("透明度の値が不正です。");
    if (parseInt(params.width, 10) < 300 || parseInt(params.width, 10) > 4096)
      throw new Error("幅の値が不正です。");
    if (parseInt(params.height, 10) < 100 || parseInt(params.height, 10) > 4096)
      throw new Error("高さの値が不正です。");
    if (
      parseInt(params.fontSize, 10) < 8 ||
      parseInt(params.fontSize, 10) > 100
    )
      throw new Error("フォントサイズの値が不正です。");
  }

  createMessage(): React.ReactElement {
    const { status, errorMessage } = this.state;

    if (status === this.TYPE_SUCCESS)
      return <div className="message success">Save success.</div>;
    if (status === this.TYPE_ERROR)
      return <div className="message error">{errorMessage}</div>;
    return <></>;
  }

  render(): React.ReactElement {
    return (
      <form id="options">
        {this.createMessage()}
        <div className="item">
          <div>Slack token:</div>
          <input type="text" placeholder="xoxp-xxxxxxx..." />
        </div>
        <div className="item">
          <div>検索文字列:</div>
          <input type="text" placeholder="in:group-hoge+from:@hogefuga" />
          <section className="description">
            <div>グループを指定 in:</div>
            <div>And条件 +</div>
            <div>特定の人を指定 from:@xxx</div>
          </section>
        </div>
        <div className="item">
          <div>透明度:</div>
          <input type="text" placeholder="0-100" />
        </div>
        <div className="item">
          <div>ウィンドウ幅:</div>
          <input type="text" placeholder="300-4096" />
        </div>
        <div className="item">
          <div>ウィンドウ高さ:</div>
          <input type="text" placeholder="100-4096" />
        </div>
        <div className="item">
          <div>フォントサイズ:</div>
          <input type="text" placeholder="8-100" />
        </div>
        <div className="item">
          <div>背景色</div>
          <input type="text" placeholder="#000000" />
        </div>
        <div className="item">
          <div>見出し色:</div>
          <input type="text" placeholder="#ffffff" />
        </div>
        <div className="item">
          <div>本文色:</div>
          <input type="text" placeholder="#ffffff" />
        </div>
        <div className="item">
          <div>ウィンドウ非表示:</div>
          <input type="checkbox" />
        </div>
        <div className="item">
          <button type="button" ref={this.saveButtonRef}>
            保存する
          </button>
        </div>
      </form>
    );
  }
}
