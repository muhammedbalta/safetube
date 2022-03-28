let videoItems = [];
function main() {
  const loc = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
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
  }
}

function blockVideo(video) {
  let videos = [];
  chrome.storage.sync.get("blockedVideos", (data) => {
    if (data.blockedVideos) {
      videos = data.blockedVideos;
      videos.push(video);
      chrome.storage.sync.set({ blockedVideos: videos });
      console.log(videos);
    } else {
      videos.push(video);
      chrome.storage.sync.set({ blockedVideos: videos });
      console.log(videos);
    }
  });
}
function featuredPageRender() {
  let videoImgs = document.querySelectorAll(
    "ytd-thumbnail #thumbnail.ytd-thumbnail yt-img-shadow.ytd-thumbnail"
  );

  videoImgs.forEach((element) => {
    const parent = element.closest(
      "#items.yt-horizontal-list-renderer>*.yt-horizontal-list-renderer"
    );
    if (parent && parent != null) {
      let a = element.closest("ytd-thumbnail #thumbnail.ytd-thumbnail");
      let text = parent.querySelector(
        "ytd-grid-video-renderer #video-title.yt-simple-endpoint.ytd-grid-video-renderer"
      ).innerText;
      const videoItem = {
        href: a.href,
        title: text,
      };
      hideBlocked(videoItem, parent);
      if (!parent.querySelector(".blockButton")) {
        const listClosebutton = document.createElement("button");
        listClosebutton.innerText = "X";
        listClosebutton.classList.add("blockButton");
        listClosebutton.classList.add("list");
        const listBlockLabel = document.createElement("div");
        listBlockLabel.innerText = "Engelle";
        listBlockLabel.classList.add("listBlockLabel");

        parent.appendChild(listClosebutton);
        parent.appendChild(listBlockLabel);
        parent.addEventListener("mouseover", () => {
          listClosebutton.classList.add("show");
        });
        parent.addEventListener("mouseleave", () => {
          listClosebutton.classList.remove("show");
        });
        listClosebutton.addEventListener("mouseover", () => {
          listBlockLabel.classList.add("show");
        });
        listClosebutton.addEventListener("mouseleave", () => {
          listBlockLabel.classList.remove("show");
        });
        listClosebutton.addEventListener("click", () => {
          parent.style.display = "none";

          blockVideo(videoItem);
        });
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

function mainGridScanner() {
  let gridVideos = document.querySelectorAll("ytd-rich-item-renderer");
  gridVideos.forEach((grid) => {
    const gridBlockButton = document.createElement("button");
    gridBlockButton.innerText = "X";
    gridBlockButton.classList.add("blockButton");
    gridBlockButton.classList.add("grid");
    grid.appendChild(gridBlockButton);
    grid.addEventListener("mouseover", () => {
      gridBlockButton.classList.add("show");
    });
    grid.addEventListener("mouseleave", () => {
      gridBlockButton.classList.remove("show");
    });
    gridBlockButton.addEventListener("click", () => {
      grid.style.display = "none";
    });
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

setInterval(main, 2000);
