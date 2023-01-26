// input Sections + template
const inputSections=document.getElementById('inputSections')
let inputSectionsTemplate=``
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
        const adminMainAside=document.getElementById('adminMainAside')
        if (adminMainAside.innerHTML!="") {
            adminMainAside.classList.remove('active')
            adminMainAside.innerHTML=""
        }
    })
    
}

// dashboard buttons click

const adminbtn=document.querySelectorAll('.adminbtn')

adminbtn.forEach((item,ind,arr)=>{
    arr[ind].addEventListener("click",()=>{
        adminBtnSelect(arr,ind)
    })
})
// TODO shop & budget functions 
function adminBtnSelect(arr,ind) {
    switch (ind) {
        case 0:
            console.log(arr[ind].innerHTML+" gomb megnyomva")
            loadUserJson()
            break;
        case 1:
            console.log(arr[ind].innerHTML+" gomb megnyomva")
        // shop
            break;
        case 2:
            console.log(arr[ind].innerHTML+" gomb megnyomva")
        // budget
            break;
        default:
            console.log("Hibás gomb megnyomva!")
            break;
    }
}

// load user.json into adminMainAside

function loadUserJson() {
     const adminMainAside=document.getElementById('adminMainAside')  
    let usersArr=JSON.parse(localStorage.users)
    let asideTemplate=`
            <div id="asideFunct" class="row jusySpBtw">
                <img src="/assets/icons/add-circle-outline.svg" alt="Új felhazsnáló hozzáadása" title="Új felhasználó hozzáadása" class="asideSvg " width="50" height="50">
                <img src="/assets/icons/create-outline.svg" alt="Szerkesztés" title="Szerkesztés" class="asideSvg " width="50" height="50">
                <img src="/assets/icons/trash-outline.svg" alt="Felhasználó eltávolítása" title="Felhasználó eltávolítása" class="asideSvg " width="50" height="50">

            </div>
            <table class="table">
                <tr id="headTr" class="">
                    <th>Név</th>
                    <th>Jelszó</th>
                </tr>`
    usersArr.map((val,ind,arr)=>{
        asideTemplate+=`
        <tr>
        <td class="td">${arr[ind].name}</td>
        <td class="td">${arr[ind].password}</td>
    </tr>
        `
    })
    asideTemplate+=`</table>`
    adminMainAside.innerHTML=asideTemplate
    setTimeout(() => {
        adminMainAside.classList.toggle('active')
    }, 30);
    const asideSvg=document.querySelectorAll('.asideSvg ')
    asideSvg.forEach((val,ind,arr)=>{
        arr[ind].addEventListener("click", () => {
        adminUserActionsSelected(arr,ind)
        })
    })
}

// selected admin user functions

function adminUserActionsSelected(arr,ind) {
    switch (ind) {
        case 0:
            console.log(arr[ind].attributes.title.nodeValue+" gomb megnyomva")
        addUser()
            break;
    
        case 1:
            console.log(arr[ind].attributes.title.nodeValue+" gomb megnyomva")

            break;
        case 2:
            console.log(arr[ind].attributes.title.nodeValue+" gomb megnyomva")

            break;
        
        default:
            break;
    }

    
}

// add user 
function addUser() {
    let usersArr=JSON.parse(localStorage.users)
    inputSectionsTemplate=`
    <div id="newUserInpSectCont" class="column aligItCent justySpAr widt95">
        <h3 class="marginTop" >Felhasználó hozzáadása</h3>
        <article class="column aligItCent inputsCont marginTop">
            <label for="newUsername">Felhasználó neve:</label>
            <input type="text" name="newUsername" id="newUserName" class="marginTop newInputs" >
            <label for="newPassword" class="marginTop">Jelszava:</label>
            <input type="text" name="newPassword" id="newPassword" class="marginTop newInputs">   
        </article>
        <article class="inputsButtonSect row jusySpBtw marginTop widt95">
            <button id="okBtn" class="itemsBtn ">Hozzáadás</button>
            <button id="cancelBtn" class="itemsBtn ">Mégse</button>
        </article>
    </div>`
    inputSections.innerHTML=inputSectionsTemplate
    inputSections.classList.toggle('active')
    const okBtn=document.getElementById('okBtn')
    const cancelBtn=document.getElementById('cancelBtn')
    const newUserName=document.getElementById('newUserName')
    const newPassword=document.getElementById('newPassword')
    // if click cancel button
    cancelBtn.addEventListener("click",()=>{
        inputSectionsClear()
    })
    // TODO input & "Hozzáad" btn click
}

// input Sections Clear

function inputSectionsClear() {
    inputSections.classList.toggle('active')
    inputSectionsTemplate=``
    setTimeout(() => {
        inputSections.innerHTML=""
        
    }, 600);
}