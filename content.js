
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
      addBlockedChannel({
        href: window.location.href,
        name: channelName.innerText,
      });
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
        if (video.href == item.href) parent.style.display = "none";
      });
    }
  });
}

function clearBlockMessage()
{
    const blockMessage = document.querySelector(".block-message");
    if(blockMessage) blockMessage.remove();
}

function setBlockMessage(msg)
{
  if(!document.querySelector(".block-message"))
  {
    const blockedMsgElement = document.createElement("div");
    blockedMsgElement.innerText = msg;
    blockedMsgElement.classList.add("block-message");
    document.body.appendChild(blockedMsgElement);
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
  });
}

function checkChannelBlocked(path) {
  const content = document.querySelector("#page-manager.ytd-app");
  var hit = false;
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      data.blockedChannels.forEach((item) => {
        var url = new URL(item.href);
        if (path.startsWith(url.pathname)) {
          if (content) {
            hit = true;
            content.style.visibility = "hidden";
            setBlockMessage("This Channel Blocked By SafeTube");
            return;
          }
        }
      });
      if (!hit) {
        content.style.visibility = "visible";
      } 
    }
  });
}

function renderDashboard() {
  let gridVideos = document.querySelectorAll("ytd-rich-item-renderer");
  gridVideos.forEach((grid) => {
    const link = grid.querySelector("#video-title-link.ytd-rich-grid-media");
    const label = grid.querySelector("#video-title.ytd-rich-grid-media");
    const channelLink = grid.querySelector("#text.complex-string.ytd-channel-name a");
    if (channelLink) {
      blockVideoByChannel(channelLink.href, grid);
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
    blockButton.innerHTML = "X";
    if (title && link) {
      blockButton.addEventListener("click", () => {
        addBlockedVideo({ href: link, title: title.innerText });
      });
    }
    buttonContainer.appendChild(blockButton);
  }
}


function checkblocked(link) {
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      data.blockedVideos.forEach((item) => {
        if (link.startsWith(item.href)) {
          const content = document.querySelector("#page-manager.ytd-app");
          if (content) {
            content.style.visibility = "hidden";
            setBlockMessage("This Video Blocked By SafeTube");
          }
        }
      });
    }
  });
}

function blockVideoByChannel(channelHref, videoElement) {
  chrome.storage.sync.get("blockedChannels", (data) => {
    if (data.blockedChannels) {
      data.blockedChannels.forEach((item) => {
        if (item.href.trim() === channelHref.trim()) {
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
  clearBlockMessage();
  checkChannelBlocked(window.location.pathname);
  switch (loc) {
    case "c":
    case "featured":
      appendBlockChannelButton();
      featuredPageRender();
      window.addEventListener("scroll", () => {
        appendBlockChannelButton();
        featuredPageRender()
      });
      break;
    case "videos":
      appendBlockChannelButton();
      channelVideoTab();
      window.addEventListener("scroll", () => {
        appendBlockChannelButton();
        channelVideoTab()
      });
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
      window.addEventListener("scroll", () => renderVerticalList())
      break;
    case "watch":
      checkblocked(window.location.href);
      watch();
      recommendList();
      window.addEventListener("scroll", () => {
        checkblocked(window.location.href);
        watch();
        recommendList();
      });
      break;
    case "":
      renderDashboard();
      window.addEventListener("scroll", () => renderDashboard())
      break;
  }
}


document.addEventListener('yt-navigate-start', main);
document.addEventListener('yt-navigate-finish', main);

if (document.body) main();
else document.addEventListener('DOMContentLoaded', main);

