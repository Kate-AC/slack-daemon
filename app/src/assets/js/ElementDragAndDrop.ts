// TODO: クラスにする
export default function startDragAndDrop(): void {
  const slackWindow = document.getElementById("slack-window");

  let x: number;
  let y: number;

  if (slackWindow === null) return;

  function mouseUp(): void {
    if (slackWindow === null) return;

    slackWindow.removeEventListener("mouseup", mouseUp, false);
    slackWindow.removeEventListener("touchend", mouseUp, false);
    document.body.removeEventListener("mousemove", mouseMove, false);
    document.body.removeEventListener("touchmove", mouseMove, false);

    chrome.storage.local.set({
      windowTop: parseInt(slackWindow.style.top, 10),
      windowLeft: parseInt(slackWindow.style.left, 10),
    });
  }

  function mouseMove(e: any): void {
    const event = (e.type === "mousemove"
      ? e
      : e.changedTouches[0]) as MouseEvent;

    event.preventDefault();

    if (slackWindow === null) return;

    slackWindow.style.top = `${event.pageY - y}px`;
    slackWindow.style.left = `${event.pageX - x}px`;

    slackWindow.addEventListener("mouseup", mouseUp, false);
    slackWindow.addEventListener("touchend", mouseUp, false);
    slackWindow.addEventListener("mouseleave", mouseUp, false);
    slackWindow.addEventListener("touchleave", mouseUp, false);
  }

  function mouseDown(this: HTMLElement, e: any): void {
    const event = (e.type === "mousedown"
      ? e
      : e.changedTouches[0]) as MouseEvent;

    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    document.body.addEventListener("mousemove", mouseMove, false);
    document.body.addEventListener("touchmove", mouseMove, false);
  }

  slackWindow.addEventListener("mousedown", mouseDown, false);
  slackWindow.addEventListener("touchstart", mouseDown, false);
}
