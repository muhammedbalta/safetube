function block() {
  let items = document.querySelectorAll(
    "#items.yt-horizontal-list-renderer>*.yt-horizontal-list-renderer"
  );
  items.forEach((element) => {
    let channelName = element.querySelector(
      "yt-formatted-string[has-link-only_]:not([force-default-style]) a.yt-simple-endpoint.yt-formatted-string"
    );

    if (channelName != null && channelName?.textContent == "Murat Soner") {
      element.style.display = "none";
    }
  });
}

setInterval(block, 1000);
