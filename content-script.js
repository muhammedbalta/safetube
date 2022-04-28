let videoItems = [];
function main() {
  const segments = window.location.pathname.substring(1).split("/");
  var loc;
  if (segments.length > 2) loc = segments[segments.length - 1];
  else loc = window.location.pathname.substring(1).split("/")[0];
  loc = loc.indexOf("?") > 0 ? loc.split("?")[0] : loc;
  checkChannelBlocked();
  switch (loc) {
    case "c":
    case "featured":
      appendBlockChannelButton();
      featuredPageRender();
      document.onscroll = featuredPageRender();
      break;
    case "videos":
      appendBlockChannelButton();
      channelVideoTab();
      document.onscroll = channelVideoTab();
      break;
    case "playlists":
      appendBlockChannelButton();
      break;
    case "community":
      appendBlockChannelButton();
      break;
    case "channels":
      appendBlockChannelButton();
      break;
    case "about":
      appendBlockChannelButton();
      break;
    case "results":
      renderVerticalList();
      document.onscroll = renderVerticalList();
      break;
    case "watch":
      checkblocked(window.location.href);
      watch();
      recommendList();
      document.onscroll = recommendList();
      break;
    case "":
      renderDashboard();
      document.onscroll = renderDashboard();
      break;
  }
}

function addBlockedVideo(video) {
  let videos = [];
  console.log(video);
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
    const videoItem = {
      href: videoTitleElement.href,
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
      const videoItem = {
        href: link.href,
        title: link.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "list");
      }
    }
  });
}

function hideBlockedVideoItem(video, parent) {
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      data.blockedVideos.forEach((item, index) => {
        if (video.href == item.href) parent.style.display = "none";
      });
    }
  });
}

function renderDashboard() {
  let gridVideos = document.querySelectorAll("ytd-rich-item-renderer");
  gridVideos.forEach((grid) => {
    const link = grid.querySelector("#video-title-link.ytd-rich-grid-media");
    const label = grid.querySelector("#video-title.ytd-rich-grid-media");
    const channel = grid.querySelector("#text.complex-string.ytd-channel-name");
    if (channel) {
      blockVideoByChannel(channel.innerText, grid);
    }
    if (link && label) {
      const videoItem = {
        href: link.href,
        title: label.innerText,
      };
      hideBlockedVideoItem(videoItem, grid);
      if (!grid.querySelector(".blockButton")) {
        addBlockButton(videoItem, grid, "grid");
      }
    }
  });
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
  });
}

function renderVerticalList() {
  const listVideoItems = document.querySelectorAll(
    "ytd-video-renderer.ytd-item-section-renderer"
  );
  listVideoItems.forEach((item) => {
    const link = item.querySelector("#video-title.ytd-video-renderer");
    if (link) {
      const videoItem = {
        href: link.href,
        title: link.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "vertical-list");
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
      const videoItem = {
        href: link.href,
        title: link.innerText,
      };
      hideBlockedVideoItem(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "list");
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
      const videoItem = {
        href: link.href,
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
    blockButton.innerHTML = "Engelle";
    if (title && link) {
      blockButton.addEventListener("click", () => {
        addBlockedVideo({ href: link, title: title.innerText });
      });
    }

    buttonContainer.appendChild(blockButton);
  }
}

function checkChannelBlocked() {
  const content = document.querySelector("#page-manager.ytd-app");
  var hit = false;
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      data.blockedChannels.forEach((item) => {
        const channelName = document.querySelector(
          "#text.ytd-channel-name"
        ).innerText;
        console.log("-" + item.name + "-" + channelName + "-");
        if (item.name.trim() === channelName) {
          if (content) {
            hit = true;
            content.style.display = "none";
            return;
          }
        }
      });
      if (!hit) content.style.display = "flex";
    }
  });
}

function checkblocked(link) {
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      data.blockedVideos.forEach((item) => {
        console.log(item.href);
        if (item.href === link) {
          const content = document.querySelector(
            "ytd-page-manager>*.ytd-page-manager"
          );
          if (content) {
            content.remove();
            const blockedMsgElement = document.createElement("div");
            blockedMsgElement.innerText = "This Video Blocked by SafeTube";
            blockedMsgElement.classList.add("block-message");
            document.body.appendChild(blockedMsgElement);
          }
        }
      });
    }
  });
}

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
    blockButton.innerHTML = "Engelle";
    blockButton.addEventListener("click", () => {
      addBlockedChannel({
        href: window.location.href,
        name: channelName.innerText,
      });
    });

    buttonContainer.appendChild(blockButton);
  }
}

function blockVideoByChannel(name, videoElement) {
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      data.blockedChannels.forEach((item) => {
        if (item.name.trim() === name.trim()) {
          videoElement.remove();
        }
      });
    }
  });
}

setInterval(main, 100);
