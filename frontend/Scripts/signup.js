const form = document.querySelector("form");
const URL = "http://localhost:8185";

const signup = document.getElementById("submit");  
form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const formData = {
        name:form.name.value,
        email:form.email.value,
        password:form.password.value,
        role:formData.role.value
    }
    signup.style.display = "none";
    showLoader2();

    const request = await fetch(`${URL}/user/register`, {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(formData)
    });
    const response = await request.json();
        
    if(response.ok){
        Swal.fire(
            response.msg,
            '',
            'success'
        )
        setTimeout(()=>{
            window.location.href = "../index.html";

        },2500)
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.msg,
            footer: `<b><u><a href="../HTML/signup.html">Signup Here!</a></u></b>`
        });
    }
    hideLoader2();
    signup.style.display = "block";
})


const google = document.getElementById("google");
const github = document.getElementById("github");

google.addEventListener("click", ()=>{
    console.log("google");
    window.location.href = "http://localhost:8185/auth/google"
})

github.addEventListener("click", ()=>{
    window.location.href = "http://localhost:8185/auth/github"
})