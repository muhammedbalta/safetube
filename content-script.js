function horizontalListScanner() {
  let videoImgs = document.querySelectorAll(
    "ytd-thumbnail #thumbnail.ytd-thumbnail yt-img-shadow.ytd-thumbnail"
  );

  videoImgs.forEach((element) => {
    const parent = element.closest(
      "#items.yt-horizontal-list-renderer>*.yt-horizontal-list-renderer"
    );
    if (parent && parent != null) {
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
      });
    }
  });
}

function mainGridScanner() {
  let gridVideos = document.querySelectorAll("ytd-rich-item-renderer");
  console.log(gridVideos.length);
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

terval(horizontalListScanner, 5000);
setInterval(mainGridScanner, 2000);
setInterval(popupBlocker, 5000);
