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

// Login
const homePage=document.getElementById('homePage')
const usersDashboard=document.getElementById('usersDashboard')
const adminDashboard=document.getElementById('adminDashboard')

function openAdminDashboard() {
    homePage.classList.toggle('active')
    setTimeout(() => {
        homePage.classList.remove('column')
        homePage.classList.add('hide')
        setTimeout(() => {
            adminDashboard.classList.toggle('active')
        }, 10);
    }, 600);    
}
function openUsersDasboard() {
    homePage.classList.toggle('active')
    setTimeout(() => {
        homePage.classList.remove('column')
        homePage.classList.add('hide')
        setTimeout(() => {
            usersDashboard.classList.toggle('active')
        }, 10);
    }, 600);
    console.log(loginName+" lépett be")
}
// Logout
const logoutBtn =document.querySelectorAll('.logoutBtn')
const dashboards=document.querySelectorAll("[data-sect]")
for (let i = 0; i < logoutBtn.length; i++) {
    logoutBtn[i].addEventListener("click",()=>{
        dashboards[i].classList.toggle('active')
        setTimeout(() => {
            homePage.classList.remove('hide')
            setTimeout(() => {
                homePage.classList.add('column')
                homePage.classList.add('active')
            }, 10);
        }, 600);
        localStorage.removeItem('user')
        localStorage.removeItem('users')
    })
    
}