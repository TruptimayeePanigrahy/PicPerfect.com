function showLoader() {
    const loader = document.getElementById("loader");
    if(!loader){
        return;
    }
    loader.style.display = "flex";
}

// Hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    if(!loader){
        return;
    }
    document.getElementById("loader").style.display = "none";
}

// Hide the loader when the image has finished loading
window.addEventListener("load", function () {
    hideLoader();
});
showLoader(); // Show the loader

function showLoader2() {
    document.getElementById("loader2").style.display = "flex";
}

// Hide the loader
function hideLoader2() {
    document.getElementById("loader2").style.display = "none";
}
// hideLoader2();
// Hide the loader when the image has finished loading
// window.addEventListener("load", function () {
//     hideLoader2();
// });
//showLoader2(); // Show the loader