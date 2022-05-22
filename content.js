let videoItems = [];

function appendBlockChannelButton() {
  const buttonContainer = document.querySelector(
    "ytd-subscribe-button-renderer"
  );
  const channelName = document.querySelector(
    "#text-container.ytd-channel-name"
  );
  if (
    buttonContainer &&
    channelName &&
    !buttonContainer.querySelector(".watchBlockButton")
  ) {
    const blockButton = document.createElement("tp-yt-paper-button");
    blockButton.classList.add("style-scope");
    blockButton.classList.add("ytd-subscribe-button-renderer");
    blockButton.classList.add("watchBlockButton");
    blockButton.innerHTML = "X";
    blockButton.addEventListener("click", () => {
      let channelID = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      addBlockedChannel({
        id: channelID,
        name: channelName.innerText,
      });
      window.location.reload();
    });

    buttonContainer.appendChild(blockButton);
  }
}

function featuredPageRender() {
  renderHeaderVideo();
  renderHorizontalLists();
}
function renderHeaderVideo() {
  let headerVideoElement = document.querySelector(
    "ytd-video-renderer:not([use-prominent-thumbs])"
  );
  if (headerVideoElement && !headerVideoElement.querySelector(".blockButton")) {
    const videoTitleElement = headerVideoElement.querySelector(
      "#video-title.ytd-video-renderer"
    );
    let params = new URL(videoTitleElement.href).searchParams;
    let linkID = params.get("v");
    const videoItem = {
      id: linkID,
      title: videoTitleElement.title,
    };
    hideBlockedVideoItem(videoItem, headerVideoElement);
    addBlockButton(videoItem, headerVideoElement, "header");
  }
}

function renderHorizontalLists() {
  let horizontalListItems = document.querySelectorAll(
    "#items.yt-horizontal-list-renderer>*.yt-horizontal-list-renderer"
  );

  horizontalListItems.forEach((item) => {
    const link = item.querySelector(
      "ytd-grid-video-renderer #video-title.yt-simple-endpoint.ytd-grid-video-renderer"
    );
    if (link) {
      let params = new URL(link.href).searchParams;
      let linkID = params.get("v");
      const videoItem = {
        id: linkID,
        title: link.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "list");
      }
    }
  });
}

function channelVideoTab() {
  const videoItems = document.querySelectorAll(
    "#items.ytd-grid-renderer>ytd-grid-video-renderer.ytd-grid-renderer"
  );
  videoItems.forEach((item) => {
    const link = item.querySelector(
      "ytd-grid-video-renderer #video-title.yt-simple-endpoint.ytd-grid-video-renderer"
    );
    if (link) {
      let params = new URL(link.href).searchParams;
      let linkID = params.get("v");
      const videoItem = {
        id: linkID,
        title: link.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "list");
      }
    }
  });
}

function addBlockedVideo(video) {
  let videos = [];
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      videos = data.blockedVideos;
      videos.push(video);
      chrome.storage.sync.set({ blockedVideos: videos });
    } else {
      videos.push(video);
      chrome.storage.sync.set({ blockedVideos: videos });
    }
  });
}

function addBlockedChannel(channel) {
  let channels = [];
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      channels = data.blockedChannels;
      channels.push(channel);
      chrome.storage.sync.set({ blockedChannels: channels });
    } else {
      channels.push(channel);
      chrome.storage.sync.set({ blockedChannels: channels });
    }
  });
}

function hideBlockedVideoItem(video, parent) {
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      data.blockedVideos.forEach((item, index) => {
        if (video.id === item.id) parent.style.display = "none";
      });
    }
  });
}

function setBlockMessage(msg) {
  if (!document.querySelector(".block-message-container")) {
    const blockedMsgElement = document.createElement("div");
    blockedMsgElement.classList.add("block-message-container");
    document.body.appendChild(blockedMsgElement);
    const textElement = document.createElement("span");
    textElement.innerText = msg;
    textElement.classList.add("block-message");
    blockedMsgElement.appendChild(textElement);
  }
}

function addBlockButton(videoItem, parent, className) {
  const blockButton = document.createElement("button");
  blockButton.innerText = "X";
  blockButton.classList.add("blockButton");
  blockButton.classList.add(className);
  parent.appendChild(blockButton);
  parent.addEventListener("mouseover", () => {
    blockButton.classList.add("show");
  });
  parent.addEventListener("mouseleave", () => {
    blockButton.classList.remove("show");
  });
  blockButton.addEventListener("click", () => {
    parent.style.display = "none";
    addBlockedVideo(videoItem);
    window.location.reload();
  });
}

function checkChannelBlocked(path) {
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      let channelID = path.substring(path.lastIndexOf("/") + 1);
      data.blockedChannels.forEach((item) => {
        console.log("Item ID: " + item.id + " / " + "Channel ID: " + channelID);
        if (item.id === channelID) {
          setBlockMessage("This Channel Blocked By SafeYouTube");
          return;
        }
      });
    }
  });
}

function renderDashboard() {
  let gridVideos = document.querySelectorAll("ytd-rich-item-renderer");
  gridVideos.forEach((grid) => {
    const link = grid.querySelector("#video-title-link.ytd-rich-grid-media");
    const label = grid.querySelector("#video-title.ytd-rich-grid-media");
    const channelLink = grid.querySelector(
      "#text.complex-string.ytd-channel-name a"
    );
    if (channelLink) {
      blockVideoByChannel(channelLink.href, grid);
    }
    if (link && label) {
      let params = new URL(link).searchParams;
      let linkID = params.get("v");
      const videoItem = {
        id: linkID,
        title: label.innerText,
      };
      hideBlockedVideoItem(videoItem, grid);
      if (!grid.querySelector(".blockButton")) {
        addBlockButton(videoItem, grid, "grid");
      }
    }
  });
}

function renderVerticalList() {
  const listVideoItems = document.querySelectorAll(
    "ytd-video-renderer.ytd-item-section-renderer"
  );
  listVideoItems.forEach((item) => {
    const link = item.querySelector("#video-title.ytd-video-renderer");
    if (link) {
      let params = new URL(link).searchParams;
      let linkID = params.get("v");
      const videoItem = {
        id: linkID,
        title: link.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "vertical-list");
      }
    }
  });
}

function recommendList() {
  const videoItems = document.querySelectorAll(
    "ytd-compact-video-renderer.ytd-item-section-renderer"
  );
  videoItems.forEach((item) => {
    const link = item.querySelector(
      "a.yt-simple-endpoint.ytd-compact-video-renderer"
    );
    const title = item.querySelector("#video-title.ytd-compact-video-renderer");
    const channel = item.querySelector("#container.ytd-channel-name");
    if (channel) {
      blockVideoByChannel(channel.innerText, item);
    }
    if (link && title) {
      let params = new URL(link).searchParams;
      let linkID = params.get("v");
      const videoItem = {
        id: linkID,
        title: title.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "recommend");
      }
    }
  });
}

function watch() {
  const buttonContainer = document.querySelector(
    "ytd-subscribe-button-renderer"
  );
  const title = document.querySelector(
    ".title.ytd-video-primary-info-renderer"
  );
  const link = window.location.href;
  if (
    title &&
    link &&
    buttonContainer &&
    !buttonContainer.querySelector(".watchBlockButton")
  ) {
    const blockButton = document.createElement("tp-yt-paper-button");
    blockButton.classList.add("style-scope");
    blockButton.classList.add("ytd-subscribe-button-renderer");
    blockButton.classList.add("watchBlockButton");
    blockButton.innerHTML = "X";
    if (title && link) {
      let params = new URL(link).searchParams;
      let linkID = params.get("v");
      blockButton.addEventListener("click", () => {
        addBlockedVideo({ id: linkID, title: title.innerText });
        window.location.reload();
      });
    }
    buttonContainer.appendChild(blockButton);
  }
}

function checkblocked(link) {
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      let params = new URL(link).searchParams;
      let linkID = params.get("v");
      data.blockedVideos.forEach((item) => {
        if (linkID === item.id) {
          setBlockMessage("This Video Blocked By SafeYouTube");
        }
      });
    }
  });
}

function blockVideoByChannel(channelHref, videoElement) {
  let channelPath = new URL(channelHref).pathname;
  let channelID = channelPath.substring(channelPath.lastIndexOf("/") + 1);
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      data.blockedChannels.forEach((item) => {
        if (item.id === channelID) {
          videoElement.remove();
        }
      });
    }
  });
}

function main() {
  const segments = window.location.pathname.substring(1).split("/");
  var loc;
  if (segments.length > 2) loc = segments[segments.length - 1];
  else loc = window.location.pathname.substring(1).split("/")[0];
  loc = loc.indexOf("?") > 0 ? loc.split("?")[0] : loc;
  document.querySelector(".block-message-container")?.remove();
  switch (loc) {
    case "c":
    case "featured":
      checkChannelBlocked(window.location.pathname);
      appendBlockChannelButton();
      featuredPageRender();
      break;
    case "videos":
      checkChannelBlocked(window.location.pathname);
      appendBlockChannelButton();
      channelVideoTab();
      break;
    case "playlists":
      checkChannelBlocked(window.location.pathname);
      appendBlockChannelButton();
      break;
    case "community":
      checkChannelBlocked(window.location.pathname);
      appendBlockChannelButton();
      break;
    case "channels":
      checkChannelBlocked(window.location.pathname);
      appendBlockChannelButton();
      break;
    case "about":
      checkChannelBlocked(window.location.pathname);
      appendBlockChannelButton();
      break;
    case "results":
      renderVerticalList();
      break;
    case "watch":
      checkblocked(window.location.href);
      watch();
      recommendList();
      break;
    case "":
      renderDashboard();
      break;
  }
}

document.addEventListener("yt-navigate-finish", () => {
  main();
});
document.addEventListener("yt-navigate-cache", () => {
  main();
});
document.addEventListener("yt-page-data-updated", () => {
  main();
});
document.addEventListener("yt-service-request-completed", () => {
  main();
});
if (document.body) {
  main();
} else
  document.addEventListener("DOMContentLoaded", () => {
    main();
  });
