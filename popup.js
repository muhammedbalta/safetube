let isBlockModeOn = false;
const blockModeCheckbox = document.querySelector("#blockModeCheckbox");

chrome.storage.local.get("isBlockModeOn", (data) => {
  isBlockModeOn = data.isBlockModeOn;
  blockModeCheckbox.checked = isBlockModeOn;
});

blockModeCheckbox.addEventListener("change", () => {
  isBlockModeOn = blockModeCheckbox.checked;
  chrome.storage.local.set({ isBlockModeOn });
});
