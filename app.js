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
        
        if (!response.ok) {
            console.log("Status: "+response.status)
            console.log("StatusText: "+response.statusText)
            if (response.status==404) {
                loginNameInp.value=""
                loginPasswInp.value=""
                const loginINpSpan=document.getElementById('loginINpSpan')
                loginINpSpan.style.color="red"
                loginINpSpan.innerHTML="Nincs meg a fájl!"
                setTimeout(() => {
                    loginINpSpan.innerHTML="Felhasználónév"
                    loginINpSpan.removeAttribute("style")
                }, 3000);
            }
            throw new Error('Network response was not OK');
          }
        return response.json();
    })
    .then(jsondata => {
        let isTrue=false
        // username and password verification
        for (let i = 0; i < jsondata.users.length; i++) {
            if (jsondata.users[i].name==loginName) {
                if (jsondata.users[i].password==password) {
                    isTrue=true
                    localStorage.setItem("user",jsondata.users[i].name)
                    if (jsondata.users[i].name=="admin") {
                        // store users.json
                        let jsonTemp=JSON.stringify(jsondata.users)
                        localStorage.setItem("users",jsonTemp)
                    }
                    loginNameInp.value=""
                    loginPasswInp.value=""
                    if (loginName=="admin") {openAdminDashboard()  }
                    else (openUsersDasboard())
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


function openAdminDashboard() {
    console.log("Az admin lépett be")
}
function openUsersDasboard() {
    console.log(loginName+" lépett be")
}

