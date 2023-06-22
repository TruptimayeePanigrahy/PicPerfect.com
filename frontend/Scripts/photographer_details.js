const dropZone = document.getElementById("dropZone");
const uploadForm = document.getElementById("uploadForm");
const detailsForm = document.getElementById("details_Form");
const url = "https://pic-perfect.onrender.com";
// prevent default drag behaviors
if (dropZone) {
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
  });

  // highlight drop zone when item is dragged over it
  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      () => {
        dropZone.classList.add("dragover");
        console.log("drag");
      },
      false
    );
  });

  // remove highlight when item is dragged out of the drop zone
  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      () => {
        dropZone.classList.remove("dragover");
        console.log("drop");
      },
      false
    );
  });

  // handle file drop
  dropZone.addEventListener(
    "drop",
    (e) => {
      const files = e.dataTransfer.files;
      console.log("hi");
      console.log(files);
      handleFiles(files);
    },
    false
  );
}

//   // handle file selection from input
//   document.getElementById('image').addEventListener('change', (e) => {
//     handleFiles(e.target.files);
//   }, false);

// handle files and add them to FormData object
async function handleFiles(files) {
  const formData = new FormData(uploadForm);
  for (let i = 0; i < files.length; i++) {
    formData.append("image", files[i]);
  }
  const token = localStorage.getItem("token");

  // send formData using fetch API
  await fetch(`${url}/user/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error(error);
    });
}
// async function handleFiles(files) {
//   console.log("form");
//   const formData = new FormData(uploadForm);
//   for (let i = 0; i < files.length; i++) {
//     formData.append("image", files[i]);
//   }
//   // send formData using fetch API
//   const token = localStorage.getItem("token");

//   try {
//     const response = await fetch(`${url}/user/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`, // include 'Bearer' before the token
//         "Content-Type": "multipart/form-data",
//       },
//       body: formData,
//     });

//     const data = await response.json();
//     console.log("Success:", data);
//   } catch (error) {
//     console.error(error);
//   }
// }

detailsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    camera: detailsForm.camera.value,
    expertise: detailsForm.expertise.value,
    address: detailsForm.address.value,
    price: detailsForm.price.value,
  };

  const token = localStorage.getItem("token");
  const request = await fetch(`${url}/user/submit_photographer_details`, {
    // console.log("jjj");
    //

    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const response = await request.json();
  console.log("fd3", formData);
  if (response) {
    Swal.fire(
      "Your Registration is Successfull",
      "Please wait for the Admin to review your Application",
      "success"
    );
    setTimeout(() => {
      window.location.href = "../HTML/photographerDashboard.html";
    }, 2500);
  }
});

// username visible after logging in

var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
  navContents.classList.toggle("show-nav");
  // console.log("clicked")
});

// username visible after logging in

let loginTag = document.getElementById("login");
let singupTag = document.getElementById("signup");

let isUserName = localStorage.getItem("userName");

if (isUserName) {
  singupTag.style.display = "none";
  loginTag.textContent = "Hi," + " " + isUserName;
  loginTag.style.color = "#dd4545";
  loginTag.setAttribute("href", "../HTML/userDashboard.html");
} else {
  singupTag.style.display = "block";
  loginTag.textContent = "Login";
}
