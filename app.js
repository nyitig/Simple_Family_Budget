// loginBtn click
const loginBtn=document.getElementById('loginBtn')
// login name input
let loginName=""
const loginNameInp=document.getElementById('loginNameInp')
    loginNameInp.addEventListener("keyup",()=>{
    loginName=loginNameInp.value
})
// password input
let password=""
const loginPasswInp=document.getElementById('loginPasswInp')
loginPasswInp.addEventListener("keyup",()=>{
    password=loginPasswInp.value
})
// Login button click
loginBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    fetch("/json/./user.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        let isTrue=false
        // username and password verification
        for (let i = 0; i < jsondata.users.length; i++) {
            if (jsondata.users[i].name==loginName) {
                if (jsondata.users[i].password==password) {
                    isTrue=true
                    console.log("Talált!")
                    loginNameInp.value=""
                    loginPasswInp.value=""
                }
            }
        }
        if (isTrue==false) {
            loginNameInp.value=""
            loginPasswInp.value=""
            const loginINpSpan=document.getElementById('loginINpSpan')
            loginINpSpan.style.color="red"
            loginINpSpan.innerHTML="Hibás felhasználónév, jelszó!"
            setTimeout(() => {
                loginINpSpan.innerHTML="Felhasználónév"
                loginINpSpan.removeAttribute("style")
            }, 3000);
        }
    }
        );
})





