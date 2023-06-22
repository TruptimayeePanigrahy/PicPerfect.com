const swiper = new Swiper('.swiper', {
    loop: true,
    autoplayDisableOnInteraction: true,
    effect: 'slide',
    autoplay: {
        delay: 1000
    },
    slidesPerView: 2
});
// Get the current URL
const currentUrl = window.location.href;
// Create a URL object from the current URL
const url2 = new URL(currentUrl);
// Get the search parameters from the URL
const searchParams = url2.searchParams;

// const url = "http://localhost:3000"
const url = "https://pic-perfect.onrender.com";
const form = document.querySelector("form");
const photographer = searchParams.get("id");
const photographerName = document.getElementById("name")
const photographerPlace = document.getElementById("place")
const photographerCamera = document.getElementById("camera")
const photographerPrice = document.getElementById("price")
const photographerExpertise = document.getElementById("expertise")
const titleName = document.querySelector("title")
const token = localStorage.getItem("token") || null;
let userData;
fetch(`${url}/user/${photographer}`)
    .then((res) => res.json())
    .then((data) => {
        userData = data.user;
        photographerName.textContent = data.user.name
        photographerPlace.textContent = data.user.address
        photographerCamera.textContent = data.user.camera
        photographerPrice.textContent = data.user.price
        photographerExpertise.textContent = data.user.expertise
        titleName.textContent += " " + data.user.name
    })

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const start = document.getElementById("start");
    const end = document.getElementById('end');
    const now = new Date();
    const minTime = now.toISOString().slice(0, 16);
    start.setAttribute('min', minTime);
    end.setAttribute('min', minTime)

    const datetimeValue = start.value;
    const datetimeValue2 = end.value;
    const selectedTime = new Date(datetimeValue);
    const selectedTime2 = new Date(datetimeValue2);
    const currentTime = new Date();
    const differenceInMilliseconds = selectedTime2 - selectedTime;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    const hours = Math.floor(differenceInHours);

    if (!datetimeValue2) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Please enter Start and End Time",
            footer: ``
        });
        start.value = ''; // Clear the input value if it's in the past
        end.value = '';
        return;
    } else if (selectedTime < currentTime) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Date could not be in the past",
            footer: ``
        });
        start.value = ''; // Clear the input value if it's in the past
        end.value = '';
        return;
    } else if (hours < 3) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "The Minimum booking duration is 4 hours",
            footer: ``
        });
        start.value = ''; // Clear the input value if it's in the past
        end.value = '';
        return;
    } else if (!token) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Please Login First",
            footer: `<a href="../HTML/login.html">Login here</a>`
        });
        start.value = ''; // Clear the input value if it's in the past
        end.value = '';
        return;
    } else if (localStorage.getItem("role") != "client") {
        Swal.fire({
            icon: "error",
            title: "",
            text: "A photographer or Admin cannot book another photographer",
            footer: ``
        });
        start.value = ''; // Clear the input value if it's in the past
        end.value = '';
        return;
    }

    const utcTime = selectedTime.toISOString();
    const utcTime2 = selectedTime2.toISOString();

    // const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("Token is not available");
    //   return;
    // }

    const req = await fetch(`${url}/book/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photographerId: userData._id,
        startTime: utcTime,
        endTime: utcTime2,
      }),
    });
    const res = await req.json();
    if (res.ok) {
        window.location.href = `../HTML/payment.html?id=${photographer}&time=${hours}`
    } else {
        Swal.fire({
            icon: "error",
            title: "",
            text: res.message,
            footer: ``
        });
    }
    // console.log(utcTime,utcTime2); // Output: UTC format of selected time
})


var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
    navContents.classList.toggle("show-nav");
    // console.log("clicked")
});



//----------------------------------- Carousel images --------------------------------------------------//
const id = url2.searchParams.get('id');
let image_1= document.getElementById("img1")
let image_2= document.getElementById("img2")
let image_3= document.getElementById("img3")
let image_4= document.getElementById("img4")
async function fetchData() {
    try {
        const response = await fetch(`${url}/user/images/${id}`);
        const data = await response.json();
        let images_array = data.Images[0].images;
        image_1.setAttribute("src",`data:image/png;base64,${images_array[0]._id}`)
        image_2.setAttribute("src",`data:image/png;base64,${images_array[1]._id}`)
        image_3.setAttribute("src",`data:image/png;base64,${images_array[2]._id}`)
        image_4.setAttribute("src",`data:image/png;base64,${images_array[3]._id}`)

    } catch (error) {
        console.error(error);
    }
}

fetchData();








// username visible after logging in

let loginTag = document.getElementById("login")
let singupTag = document.getElementById("signup")

let isUserName = localStorage.getItem("userName")

if (isUserName) {
    singupTag.style.display = "none"
    loginTag.textContent = "Hi," + " " + isUserName
    loginTag.style.color = "#dd4545"
    loginTag.setAttribute("href", "../HTML/userDashboard.htmll");
} else {
    singupTag.style.display = "block"
    loginTag.textContent = "Login"
}

