const URL = "https://pic-perfect.onrender.com";
const form = document.querySelector("form");
const submit = document.getElementById("submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    email: form.email.value,
    pass: form.pwd.value,
  };
  submit.style.display = "none";
  showLoader2();

  const request = await fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const response = await request.json();
  if (response.ok) {
    localStorage.setItem("userName", response.userName);
    localStorage.setItem("role", response.role);
    localStorage.setItem("approved", response.approved);
    Swal.fire(response.msg, "", "success");

    setTimeout(() => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.id);
      if (response.role == "photographer" && response.approved) {
        window.location.href = "../HTML/photographerDashboard.html";
      } else if (response.role == "photographer") {
        window.location.href = "../HTML/photographer_details.html";
      } else if (response.role == "admin") {
        window.location.href = "../admin/admin.html";
      } else {
        window.location.href = "../index.html";
      }
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response.msg,
      footer: `<b><u><a href="../HTML/signup.html">Register Here!</a></u></b>`,
    });
  }
  submit.style.display = "block";
  hideLoader2();
  form.email.value = "";
  form.pwd.value = "";
});

const google = document.getElementById("google");
const github = document.getElementById("github");

<<<<<<< HEAD
google.addEventListener("click", ()=>{
  console.log("google");
  window.location.href = "http://localhost:8185/user/auth/google"
})

github.addEventListener("click", ()=>{
  window.location.href = "http://localhost:8185/user/auth/github"
})
=======
google.addEventListener("click", () => {
  window.location.href = "https://pic-perfect.onrender.com/auth/google";
});

github.addEventListener("click", () => {
  window.location.href = "https://pic-perfect.onrender.com/auth/github";
});
>>>>>>> 77cb14addf8d42d616fd7135c0e937d8ef317ea9
