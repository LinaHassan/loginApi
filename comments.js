const user = JSON.parse(localStorage.getItem("user"));
const post = localStorage.getItem("post");
const currentUrl = new URL(window.location.href);
const id = new URLSearchParams(currentUrl.search).get("id");

window.addEventListener("load", () => {
  getComment();
});
const getComment = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + `${id}` + "/comments"
  );

  const data = await response.json();
  const continer = document.getElementById("continer");
  const profileImg = document.getElementById("profimg");
  profileImg.setAttribute("src", "img/Ellipse.png");
  document.getElementById("name").innerHTML = user.name;
  document.getElementById("username").innerHTML = "@" + user.username;
  document.getElementById("posts").innerHTML = post;

  data.forEach((comment) => {
    const commentCard = document.createElement("div");
    continer.appendChild(commentCard);
    commentCard.setAttribute("class", "myposts mycomments");

    const commentImg = document.createElement("img");
    commentImg.setAttribute("src", "img/comment.png");
    commentImg.setAttribute("alt", "comment pic");
    commentCard.appendChild(commentImg);

    const nameInfo = document.createElement("div");
    commentCard.appendChild(nameInfo);
    nameInfo.setAttribute("class", "text-info");

    const name = document.createElement("p");
    name.innerHTML = comment.name;
    nameInfo.append(name);

    const commentSec = document.createElement("div");
    commentCard.appendChild(commentSec);
    commentSec.setAttribute("class", "allcomments");

    const commentText = document.createElement("p");
    commentText.innerHTML = comment.body;
    commentSec.appendChild(commentText);
  });
};
