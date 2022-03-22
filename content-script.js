const items = document.querySelectorAll("yt-formatted-string[title]");
console.log(items);
const items2 = document.querySelectorAll("yt-formatted-string[title]");
console.log(items);

/*items.forEach((element) => {
  console.log(element);
  element.style.color = "red";
});*/

function displayHello() {
  let items = document.querySelectorAll(
    "a.yt-simple-endpoint.yt-formatted-string"
  );
  items.forEach((element) => {
    console.log(element);
    element.style.color = "red";
  });
}

setInterval(displayHello, 1000);
