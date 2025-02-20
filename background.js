chrome.runtime.onStartup.addListener(() => {
  console.log("LocalTunnel User-Agent Switcher loaded");
});

chrome.declarativeNetRequest.updateDynamicRules(
  {
    removeRuleIds: [1], // Remove previous rule if exists
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            {
              header: "User-Agent",
              operation: "set",
              value: "localtunnel",
            },
          ],
        },
        condition: {
          urlFilter: "*://*.loca.lt/*",
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "script",
            "xmlhttprequest",
            "stylesheet",
            "image",
            "media",
            "object",
            "other",
          ],
        },
      },
    ],
  },
  () => {
    if (chrome.runtime.lastError) {
      console.error("Error applying rules:", chrome.runtime.lastError);
    } else {
      console.log("User-Agent override rule applied to all resources.");
    }
  }
);
