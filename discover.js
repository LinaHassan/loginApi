const user = JSON.parse(localStorage.getItem("user"));
const iduser = user.id;
const name = user.name;
const username = user.username;

const getPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + iduser + "/posts"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const postsdata = await response.json();

  postsdata.forEach((post) => {
    const body = post.body;
    const id = post.id;
    createPost(body, id);
  });
  document.addEventListener("click", (event) => {
    if (event.target.matches(".post")) {
      const postid = event.target.id;
      const post = postsdata.find((item) => item.id == postid).body;
      localStorage.setItem("postid", postid);
      localStorage.setItem("post", post);
      window.location.href = "comments.html";

      return;
    }
  });
};

getPosts();

document.getElementById("addpost").addEventListener("click", function () {
  document.getElementById("add").style.display = "block";
});

document.getElementById("newpost").addEventListener("click", function () {
  const body = document.getElementById("text");
  const test = body.value;
  document.getElementById("add").style.display = "none";

  createPost(test);
});

function createPost(body, id) {
  const continer = document.getElementById("continer");

  const onepost = document.createElement("div");
  continer.append(onepost);
  onepost.setAttribute("class", "myposts");

  var myimg = document.createElement("img");
  myimg.setAttribute("src", "Ellipse.png");
  myimg.setAttribute("alt", "Profile pic");
  onepost.append(myimg);

  const nameinfo = document.createElement("div");
  onepost.append(nameinfo);
  nameinfo.setAttribute("class", "text-info");

  const pname = document.createElement("p");
  pname.innerHTML = name;
  nameinfo.append(pname);

  const puname = document.createElement("p");
  puname.innerHTML = "@" + username;
  puname.setAttribute("class", "username");

  nameinfo.append(puname);

  const allPosts = document.createElement("div");
  onepost.append(allPosts);
  allPosts.setAttribute("class", "allpost");

  const postEl = document.createElement("p");
  postEl.innerHTML = body;
  postEl.setAttribute("class", "post");
  postEl.setAttribute("id", id);
  allPosts.append(postEl);

  const commsec = document.createElement("div");
  commsec.setAttribute("class", "commsec");
  onepost.append(commsec);

  const comm = document.createElement("input");
  comm.setAttribute("placeholder", "Add commment");
  comm.setAttribute("onkeydown", "addComm(this)");

  commsec.append(comm);
}

function addComm(comm) {
  if (event.key === "Enter" && comm.value != "") {
    const section = document.createElement("section");
    section.setAttribute("class", "myposts");

    var myimg = document.createElement("img");
    myimg.setAttribute("src", "Ellipse.png");
    myimg.setAttribute("alt", "Profile pic");
    section.append(myimg);

    const nameinfo = document.createElement("div");
    section.append(nameinfo);
    nameinfo.setAttribute("class", "text-info");

    const pname = document.createElement("p");
    pname.innerHTML = name;
    nameinfo.append(pname);
    const comment = document.createElement("p");
    comment.setAttribute("class", "mycomment");
    section.append(comment);
    comment.innerHTML = comm.value;
    comm.insertAdjacentElement("beforebegin", section);
    comm.value = "";
  }
}

/*
document.querySelectorAll('post').forEach(elem => {
  elem.addEventListener('click', () => {
    console.log('yeeeees');
  });
});
*/
/*
function saveid(e){
  localStorage.setItem("postid", e);

     return
  }*/
