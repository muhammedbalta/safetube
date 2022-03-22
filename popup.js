const colorToggler = document.getElementById("colorToggler");

function setPageBackgroundColor() {
  const items = document.querySelectorAll(
    "a.yt-simple-endpoint.yt-formatted-string"
  );
  console.log(items);
  items.forEach((element) => {
    console.log(element);
    element.style.color = "red";
  });
}

colorToggler.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});
