
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


