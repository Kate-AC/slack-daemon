import axiosBase from "axios";

require.context("./assets/js/", true, /\.(js|ts)$/);

chrome.runtime.onInstalled.addListener(() => {
  setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, func);
  }, 3000);
});

const func = (tabs: any): void => {
  try {
    const currentTab = tabs[0];

    if (currentTab.url.indexOf("chrome://") > -1) return;

    chrome.storage.local.get(["params"], (values) => {
      const { slackToken, query } = values.params;
      if (typeof slackToken === "undefined" || typeof query === "undefined") return;
      loadMessages(currentTab.id, slackToken, query);
    });
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

async function loadMessages(
  tabId: number,
  token: string,
  query: string
): Promise<void> {
  const url = `https://slack.com/api/search.messages?query=${query}&count=50&sort=timestamp&sort_dir=desc`;

  await axiosBase
    .request({
      headers: {
        authorization: `Bearer ${token}`,
      },
      url,
      method: "GET",
    })
    .then((results) => {
      chrome.tabs.sendMessage(tabId, results);
    });
}
