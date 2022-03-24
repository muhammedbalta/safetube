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

setInterval(listBlockRender, 5000);
