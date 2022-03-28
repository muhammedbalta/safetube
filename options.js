let blockedVideos = [];
const videoList = document.querySelector("#videoList");
chrome.storage.sync.get("blockedVideos", (data) => {
  blockedVideos = data.blockedVideos;
  console.log(data.blockedVideos);
  blockedVideos.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item.title;
    videoList.appendChild(li);
  });
});
