chrome.runtime.onStartup.addListener(() => {
  console.log("Tunnel Pass loaded");
});

// Apply User-Agent override for loca.lt
chrome.declarativeNetRequest.updateDynamicRules(
  {
    removeRuleIds: [1, 2], // Remove previous rules if they exist
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
      {
        id: 2,
        priority: 1,
        action: {
          type: "redirect",
          redirect: { url: "http://localhost:5173" }
        },
        condition: {
          urlFilter: "http://vite/*", // Matches "http://vite"
          resourceTypes: ["main_frame"]
        }
      }
    ],
  },
  () => {
    if (chrome.runtime.lastError) {
      console.error("Error applying rules:", chrome.runtime.lastError);
    } else {
      console.log("User-Agent override and Vite redirect rules applied.");
    }
  }
);
