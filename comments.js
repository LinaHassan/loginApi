const user = JSON.parse(localStorage.getItem("user"));
const name = user.name;
const username = user.username;
const post = localStorage.getItem("post");

window.addEventListener("load", () => {
  const postId = localStorage.getItem("postid");

  const getcomm = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const commdata = await response.json();
    const allcomeent = commdata.filter((item) => item.postId == postId);
    const continer = document.getElementById("continer");

    //---------------------------------------------------------------------------------------
    var myimg = document.getElementById("profimg");
    myimg.setAttribute("src", "Ellipse.png");
    document.getElementById("name").innerHTML = name;
    document.getElementById("username").innerHTML = "@" + username;
    document.getElementById("test").innerHTML = post;
    //-----------------------------------------------------------------------------------------

    allcomeent.forEach((comment) => {
      const onepost = document.createElement("div");
      continer.append(onepost);
      onepost.setAttribute("class", "myposts mycomments");

      var myimg = document.createElement("img");
      myimg.setAttribute("src", "comment.png");
      myimg.setAttribute("alt", "comment pic");
      onepost.append(myimg);

      const nameinfo = document.createElement("div");
      onepost.append(nameinfo);
      nameinfo.setAttribute("class", "text-info");

      const pname = document.createElement("p");
      pname.innerHTML = comment.name;
      nameinfo.append(pname);

      const commsec = document.createElement("div");
      onepost.append(commsec);
      commsec.setAttribute("class", "allcomments");

      const comm = document.createElement("p");
      comm.innerHTML = comment.body;
      commsec.append(comm);
    });
  };
  getcomm();
});
