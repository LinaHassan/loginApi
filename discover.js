const user = JSON.parse(localStorage.getItem("user"));

window.addEventListener("load", () => {
  getPosts();

  document.getElementById("addpost").addEventListener("click", () => {
    document.getElementById("add").style.display = "block";
  });

  document.getElementById("newpost").addEventListener("click", () => {
    const text = document.getElementById("text");
    const newPost = text.value;
    document.getElementById("add").style.display = "none";

    createPost(newPost);
  });
});

const getPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + `${user.id}` + "/posts"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const postsData = await response.json();

  postsData.forEach((post) => {
    createPost(post.body, post.id);
  });

  document.addEventListener("click", (event) => {
    if (event.target.matches(".post")) {
      const postId = event.target.id;
      const post = postsData.find((item) => item.id == postId).body;
      localStorage.setItem("post", post);
      window.location.href = "comments.html?id="+`${postId}`;

      return;
    }
  });
};

const createPost = (postBody, id) => {
  const continer = document.getElementById("continer");
  const postCard = document.createElement("div");
  postCard.setAttribute("class", "myposts");

  const profileImg = document.createElement("img");
  profileImg.setAttribute("src", "img/Ellipse.png");
  profileImg.setAttribute("alt", "Profile pic");

  const nameInfo = document.createElement("div");
  nameInfo.setAttribute("class", "text-info");

  const name = document.createElement("p");
  name.innerHTML = user.name;

  const userName = document.createElement("p");
  userName.innerHTML = "@" + user.name;
  userName.setAttribute("class", "username");

  const allPosts = document.createElement("div");
  allPosts.setAttribute("class", "allpost");

  const postEl = document.createElement("p");
  postEl.innerHTML = postBody;
  postEl.setAttribute("class", "post");
  postEl.setAttribute("id", id);

  const commentSec = document.createElement("div");
  commentSec.setAttribute("class", "commsec");

  const comment = document.createElement("input");
  comment.setAttribute("placeholder", "Add commment");
  comment.setAttribute("onkeydown", "addComment(this)");
  continer.appendChild(postCard);
  postCard.appendChild(profileImg);
  postCard.appendChild(nameInfo);
  nameInfo.appendChild(name);
  nameInfo.appendChild(userName);
  postCard.appendChild(allPosts);
  allPosts.appendChild(postEl);
  postCard.appendChild(commentSec);
  commentSec.append(comment);
};

const addComment = (comment) => {
  if (event.key === "Enter" && comment.value != "") {
    const section = document.createElement("section");
    section.setAttribute("class", "myposts");

    const commentImg = document.createElement("img");
    commentImg.setAttribute("src", "img/Ellipse.png");
    commentImg.setAttribute("alt", "Profile pic");
    section.appendChild(commentImg);

    const nameinfo = document.createElement("div");
    section.append(nameinfo);

    nameinfo.setAttribute("class", "text-info");

    const name = document.createElement("p");
    name.innerHTML = user.name;
    nameinfo.append(name);
    const newComment = document.createElement("p");
    newComment.setAttribute("class", "mycomment");
    section.append(newComment);
    newComment.innerHTML = comment.value;
    comment.insertAdjacentElement("beforebegin", section);
    comment.value = "";
  }
};
