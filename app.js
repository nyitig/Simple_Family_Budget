// locaostorage create admin user if no user
function localstorCheck() {
    if (localStorage.users===undefined) {
        let adminUser=[{"name":"admin", "password":"admin"}]
        localStorage.setItem("users", JSON.stringify(adminUser))
    }    
}
localstorCheck()
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
    let usersTemp=JSON.parse(localStorage.users)
    let isTrue=false
    // username and password verification
    for (let i = 0; i < usersTemp.length; i++) {
        if (usersTemp[i].name==loginName) {
            if (usersTemp[i].password==password) {
                isTrue=true
                // store user name
                localStorage.setItem("user",usersTemp[i].name)
                loginNameInp.value=""
                loginPasswInp.value=""
                if (loginName=="admin") {openAdminDashboard()  }
                else {
                    openUsersDasboard()
                }
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
const adminMainAside=document.getElementById('adminMainAside')  

function loadUserJson() {
    console.log("loadUserJson megy")
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
    let newUsNm=""
    let newUsPw=""
    // typing new username
    newUserName.addEventListener("keyup",()=>{
        newUsNm=newUserName.value
    })
    // typing new user password
    newPassword.addEventListener("keyup",()=>{
        newUsPw=newPassword.value
    })
    // if click cancel button
    cancelBtn.addEventListener("click",()=>{
        inputSectionsClear()
    })
    // add new user btn click
    okBtn.addEventListener("click",()=> {
/*
- le kell elenőrizni, h a beírt username létezik-e már. Ha igen, akkor hiba:
        - users-t be kell olvasni, és ellenőrizni, h a beírt felhasználónév létezik-e
- ha nem, akkor
*/ 
        let usersTemp=JSON.parse(localStorage.users)
        isTrue=true
        usersTemp.forEach((val,ind)=>{
            if (usersTemp[ind].name==newUsNm) {
                isTrue=false
                newUserName.style.color="red"
                newUserName.value="Válassz másik nevet!"
                setTimeout(() => {
                    newUserName.value=""
                    newUserName.removeAttribute('style')
                }, 3000);
                return;
            }
            if (usersTemp[ind]!=newUsNm) {
                if (newUsPw=="") {
                    isTrue=false
                    newPassword.style.color="red"
                    newPassword.value="Add meg a jelszót!"
                    setTimeout(() => {
                        newPassword.value=""
                        newPassword.removeAttribute('style')
                    }, 3000);
                    return;
                }
            }
        })
        if (isTrue) {
            let newUsObj={"name":newUsNm, "password":newUsPw}
            usersTemp.push(newUsObj)
            localStorage.removeItem("users")
            localStorage.setItem("users",JSON.stringify(usersTemp))
            inputSections.classList.remove('active')
            adminMainAsideClear()
            loadUserJson()
            setTimeout(() => {
                inputSections.innerHTML=""
            }, 3000);
        }
    })
}

// input Sections Clear

function inputSectionsClear() {
    inputSections.classList.toggle('active')
    inputSectionsTemplate=``
    setTimeout(() => {
        inputSections.innerHTML=""
        
    }, 600);
}

// clear adminaAside

function adminMainAsideClear() {
    adminMainAside.classList.toggle('active')
    adminMainAside.innerHTML=""
}