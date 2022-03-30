let videoItems = [];
function main() {
  const loc = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  console.log(loc);
  switch (loc) {
    case "featured":
      featuredPageRender();
      document.onscroll = featuredPageRender();
      break;
    case "videos":
      console.log("videos");
      break;
    case "playlists":
      console.log("playlists");
      break;
    case "community":
      console.log("community");
      break;
    case "channel":
      console.log("channels");
      break;
    case "about":
      console.log("about");
      break;
    case "":
      dashboard();
      document.onscroll = dashboard();
      break;
  }
}

function blockVideo(video) {
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
function featuredPageRender() {
  headerVideo();
  horizontalList();
}
function headerVideo() {
  const headerVideoElement = document.querySelector(
    "ytd-video-renderer:not([use-prominent-thumbs])"
  );
  const title = headerVideoElement.querySelector(
    "#video-title.ytd-video-renderer"
  ).title;
  const href = headerVideoElement.querySelector(
    "#video-title.ytd-video-renderer"
  ).href;
  const videoItem = {
    href,
    title,
  };
  hideBlocked(videoItem, headerVideoElement);
  if (!headerVideoElement.querySelector(".blockButton")) {
    addBlockButton(videoItem, headerVideoElement, "list");
  }
}

function horizontalList() {
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
      hideBlocked(videoItem, item);
      if (!item.querySelector(".blockButton")) {
        addBlockButton(videoItem, item, "list");
      }
    }
  });
}

function hideBlocked(video, parent) {
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      data.blockedVideos.forEach((item, index) => {
        if (video.href == item.href) parent.style.display = "none";
      });
    }
  });
}

function dashboard() {
  let gridVideos = document.querySelectorAll("ytd-rich-item-renderer");
  gridVideos.forEach((grid) => {
    const href = grid.querySelector(
      "#video-title-link.ytd-rich-grid-media"
    ).href;
    const title = grid.querySelector(
      "#video-title.ytd-rich-grid-media"
    ).innerText;
    const videoItem = {
      href,
      title,
    };
    hideBlocked(videoItem, grid);
    if (!grid.querySelector(".blockButton")) {
      addBlockButton(videoItem, grid, "grid");
    }
  });
}

function blockHeaderVideo() {
  const headerContent = document.querySelector("ytd-video-renderer");
  if (headerContent && headerContent != null) {
    const videoImg = headerContent.querySelector(
      "ytd-thumbnail #thumbnail.ytd-thumbnail yt-img-shadow.ytd-thumbnail"
    );
    const listClosebutton = document.createElement("button");
    listClosebutton.innerText = "X";
    listClosebutton.classList.add("listBlockButton");
    const listBlockLabel = document.createElement("div");
    listBlockLabel.innerText = "Engelle";
    listBlockLabel.classList.add("listBlockLabel");
    videoImg.appendChild(listClosebutton);
    videoImg.appendChild(listBlockLabel);
    headerContent.addEventListener("mouseover", () => {
      listClosebutton.classList.add("show");
    });
    headerContent.addEventListener("mouseleave", () => {
      listClosebutton.classList.remove("show");
    });
    listClosebutton.addEventListener("mouseover", () => {
      listBlockLabel.classList.add("show");
    });
    listClosebutton.addEventListener("mouseleave", () => {
      listBlockLabel.classList.remove("show");
    });
    listClosebutton.addEventListener("click", () => {
      headerContent.style.display = "none";
    });
  }
}

function addBlockButton(videoItem, parent, className) {
  const blockButton = document.createElement("button");
  blockButton.innerText = "X";
  blockButton.classList.add("blockButton");
  blockButton.classList.add(className);
  const blockLabel = document.createElement("div");
  blockLabel.innerText = "Engelle";
  blockLabel.classList.add("blockLabel");

  parent.appendChild(blockButton);
  parent.appendChild(blockLabel);
  parent.addEventListener("mouseover", () => {
    blockButton.classList.add("show");
  });
  parent.addEventListener("mouseleave", () => {
    blockButton.classList.remove("show");
  });
  blockButton.addEventListener("mouseover", () => {
    blockLabel.classList.add("show");
  });
  blockButton.addEventListener("mouseleave", () => {
    blockLabel.classList.remove("show");
  });
  blockButton.addEventListener("click", () => {
    parent.style.display = "none";

    blockVideo(videoItem);
  });
}

setInterval(main, 100);
