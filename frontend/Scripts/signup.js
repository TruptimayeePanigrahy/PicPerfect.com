const form = document.querySelector("form");
const URL = "http://localhost:8185";


const signup = document.getElementById("submit");
const client_checked = document.getElementById("radio1");
const photographer_checked = document.getElementById("radio2");
console.log("hello");
form.addEventListener("submit", async (e) => {
    console.log("change");
  const checkedValue = document.querySelector(
    "input[type=radio]:checked"
  ).value;
  e.preventDefault();
  const formData = {
    name: form.name.value,
    email: form.email.value,
    pass: form.pass.value,
    role: checkedValue,
  };
    console.log(formData, "formdata1");
  signup.style.display = "none";
  showLoader2();

  const request = await fetch(`${URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  console.log(formData,"formdata2");
  const response = await request.json();
  console.log(response,"response");

  if (response.ok) {
    Swal.fire(response.msg, "", "success");
    setTimeout(() => {
      window.location.href = "../HTML/login.html";
    }, 2500);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response.msg,
      footer: `<b><u><a href="../HTML/login.html">Login Here!</a></u></b>`,
    });
  }
  hideLoader2();
  signup.style.display = "block";
});

const google = document.getElementById("google");
const github = document.getElementById("github");

google.addEventListener("click", () => {
  window.location.href = "https://bookmyshoot-backend.onrender.com/auth/google";
});

github.addEventListener("click", () => {
  window.location.href = "https://bookmyshoot-backend.onrender.com/auth/github";
});
