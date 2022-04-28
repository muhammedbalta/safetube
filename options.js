let blockedVideos = [];
let blockedChannels = [];
const videoSearchInput = document.querySelector("#videoList input");
const channelSearchTnput = document.querySelector("#channelList input");
const videoSearchButton = document.querySelector("#videoList button");
const channelSearchButton = document.querySelector("#channelList button");
const videoList = document.querySelector("#videoList");
const channelList = document.querySelector("#channelList");
function printVideoList() {
  blockedVideos.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    const itemElement = document.createElement("div");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    removeButton.addEventListener("click", () => {
      var filteredBlockedVideos = blockedVideos.filter(
        (v) => v.title != item.title
      );
      chrome.storage.sync.set({ blockedVideos: filteredBlockedVideos });
      window.location.reload();
    });
    itemElement.innerHTML = item.title;
    itemContainer.appendChild(itemElement);
    itemContainer.appendChild(removeButton);
    videoList.appendChild(itemContainer);
  });
}

function printChannelList() {
  blockedChannels.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    const itemElement = document.createElement("div");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    itemElement.innerHTML = item.name;
    removeButton.addEventListener("click", () => {
      var filteredBlockedChannels = blockedChannels.filter(
        (c) => c.name != item.name
      );
      chrome.storage.sync.set({ blockedChannels: filteredBlockedChannels });
      window.location.reload();
    });
    itemContainer.appendChild(itemElement);
    itemContainer.appendChild(removeButton);
    channelList.appendChild(itemContainer);
  });
}
function getBlockedVideos() {
  chrome.storage.sync.get("blockedVideos", (data) => {
    blockedVideos = data.blockedVideos;
    printVideoList();
  });
}

function getBlockedChannels() {
  chrome.storage.sync.get("blockedChannels", (data) => {
    blockedChannels = data.blockedChannels;
    printChannelList();
  });
}

getBlockedVideos();
getBlockedChannels();
videoSearchButton.addEventListener("click", () => {
  videoList.querySelectorAll(".item-container").forEach((e) => e.remove());
  blockedVideos = blockedVideos.filter((v) =>
    v.title.toLowerCase().startsWith(videoSearchInput.value.toLowerCase())
  );
  printVideoList();
});

channelSearchButton.addEventListener("click", () => {
  channelList.querySelectorAll(".item-container").forEach((e) => e.remove());
  blockedChannels = blockedChannels.filter((c) =>
    c.name.toLowerCase().startsWith(channelSearchTnput.value.toLowerCase())
  );
  printChannelList();
});
