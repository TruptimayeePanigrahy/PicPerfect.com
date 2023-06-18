const URL = "http://localhost:8185";
const form = document.querySelector("form");
const submit = document.getElementById("submit");
let email=document.getElementById("email")
let password=document.getElementById("pwd")

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    submit.style.display = "none";
    showLoader2();
    let formData = {
        email:email.value,
        pass:password.value
    }
    console.log(formData)
        
    const request = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await request.json();
    console.log(response);
    if(response.ok){
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("role",response.role);
        localStorage.setItem("approved",response.approved);
        Swal.fire(
            response.msg,
            '',
            'success'
        )
        setTimeout(()=>{
        localStorage.setItem("token", response.token);
        localStorage.setItem("id",response.id)
        if(response.role == "photographer" && response.approved){
            window.location.href = "../HTML/photographerDashboard.html"
        } else if(response.role == "photographer"){
            window.location.href = "../HTML/photographer_details.html"
        } else if(response.role == "admin"){
                window.location.href = "./admin.js"
        }else {
            window.location.href = "../HTML/clientDashboard.html";
        }
    },2000)

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.msg,
            footer: `<b><u><a href="../HTML/signup.html">Register Here!</a></u></b>`
        });
    }
    submit.style.display = "block";
    hideLoader2();
    form.email.value = "";
    form.password.value = "";
})

const google = document.getElementById("google");
const github = document.getElementById("github");

google.addEventListener("click", ()=>{
    window.location.href = ""
})
github.addEventListener("click", ()=>{
    window.location.href = ""
})