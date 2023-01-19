const email = document.getElementById("email");
const btn = document.getElementById("btn");
const error = document.getElementById("error");
const pass = document.getElementById("pass");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!email.value || !pass.value) {
    error.innerHTML = "Please enter your email and password.";
    return;
  }
  getUsers();
});

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await response.json();
  const user = data.find((item) => item.email == email.value);

  if (user) {
    window.location.href = "discover.html";
    localStorage.user = JSON.stringify(user);
  } else {
    email.innerHTML = "";
    pass.innerHTML = "";

    error.innerHTML = "Your Email is wrong please try again";
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
