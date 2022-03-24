function listBlockRender() {
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
      listClosebutton.classList.add("listBlockButton");
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
    //headerContent.style.display = "none";
  }
}

function menuButtons() {
  const menuButtonList = document.querySelectorAll("ytd-menu-renderer");
  console.log(menuButtonList);
  menuButtonList.forEach((menuButton) => {
    menuButton.addEventListener("click", () => {
      alert("Hi");
    });
  });
  /*if (menuButton && menuButton != null) {
    menuButton.addEventListener("click", () => {
      alert("hi");
    });
  }*/
}

function popupBlocker() {
  const popupContainers = document.querySelectorAll("tp-yt-paper-listbox");
  console.log(popupContainers.length);
  /* popupContainers.forEach((container) => {
    const item = document.createElement("ytd-menu-service-item-renderer");
    item.classList.add("style-scope");
    item.classList.add("ytd-menu-popup-renderer");
    container.appendChild(item);
  });*/
}
setInterval(listBlockRender, 5000);
setInterval(popupBlocker, 5000);
