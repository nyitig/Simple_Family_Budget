// indexTempArr
let indexTempArr=[]
// locaostorage create admin user if no user
function localstorCheck() {
    if (localStorage.users===undefined) {
        let adminUser=[{"name":"admin", "password":"admin"}]
        localStorage.setItem("users", JSON.stringify(adminUser))
    }    
}
localstorCheck()
// device check
function deviceCheck() {
    const userAgent = navigator.userAgent.toLowerCase();
    let isTrue=false
    let isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

    if(isMobile) {
        isTrue=true
        console.log("Mobile")
    }else if(isTablet){
        isTrue=true
        console.log("Tablet")
    }
    if (isTrue) {
        const body=document.getElementById('body')
        let wrongTemplate=`
        <secion id="homePage" class="column aligItCent justyContCent active">
            <h3 class="marginTop textAlCent">
            Sajnos ez a program nem működik ezen az eszközön!
            </h3>
            <h3 class="marginTop textAlCent">
            Csak asztali gépen működik, próbáld ki azon!
            </h3>
        </section>
        `
        body.innerHTML=wrongTemplate
    }
}
deviceCheck()
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

// USER BUTTON & USER ACTIONS

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
    asideTemplate+=`</table>
    <article class="inputsButtonSect row jusySpBtw marginTop widt95">
    <button id="exportBtn" class="itemsBtn ">Export</button>
    <button id="importBtn" class="itemsBtn ">Import</button>
</article>
    `

    adminMainAside.innerHTML=asideTemplate
    const exportBtn=document.getElementById('exportBtn')
    const importBtn=document.getElementById('importBtn')
    exportBtn.addEventListener("click",()=>{
        exportUsers()
    })
    importBtn.addEventListener("click",()=>{
        importUsers()
    })

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

// export users to users.json

function exportUsers() {
    // innen folytasd!
    let exportInpSectTempl=`
    <div id="inputSectFstCont" class="column aligItCent justySpAr widt95 marginCent height100">
        <h3 class="marginTop" >Felhasználók exportálása</h3>
        <h3 class="marginTop" >Biztos, hogy exportálni akarod a felhasználókat?</h3>
    <article class="inputsButtonSect row jusySpBtw marginTop widt95">
        <button id="exportOkBtn" class="itemsBtn ">Export</button>
        <button id="cancelBtn" class="itemsBtn ">Mégsem</button>
    </article>
    </div>
    `
    inputSections.innerHTML=exportInpSectTempl
    inputSections.classList.add('active')
    const cancelBtn=document.getElementById('cancelBtn')
    cancelBtn.addEventListener("click",()=>{
        inputSectionsClear()
    })
    exportOkBtn.addEventListener("click",()=>{
        exportUsersToJSON()
    })

}

function exportUsersToJSON() {
    let saveUsers=localStorage.getItem("users")
    let file= new Blob([saveUsers], {type:'application/json'})
    let atag=document.createElement("a")
    atag.href=URL.createObjectURL(file)
    atag.download="users.json"
    atag.click()
    inputSectionsClear()
}

// import users from .json
function importUsers() {
    let importUsersSecTempl=`
    <div id="importUsersInpFrstSec" class="column aligItCent justySpAr widt95 height100 marginCent">
        <h3 class="marginTop">Válaszd ki a fájlt!</h3>
        <input type="file" name="usersJsonInp" id="usersJsonInp" accept="application/json" class="marginTop">
        <article class="inputsButtonSect row jusySpBtw marginTop widt95">
            <button id="cancelBtn" class="itemsBtn ">Mégse</button>
        </article>
    </div>
    `
    inputSections.innerHTML=importUsersSecTempl
    inputSections.classList.add('active')
    const cancelBtn=document.getElementById('cancelBtn')
    cancelBtn.addEventListener("click",()=>{
        inputSectionsClear()
    })
    const okBtn=document.getElementById('okBtn')
    const usersJsonInp=document.getElementById('usersJsonInp')
    usersJsonInp.addEventListener("change",()=>{
        let file = usersJsonInp.files[0]
        let reader = new FileReader()
        reader.onloadend=function () {
            let load =JSON.parse(reader.result)
           jsonCheck(load)
        }
        reader.readAsText(file)
    })
   
}

function jsonCheck(load) {
    let newArr=load
    let newUsersName=[]
    let newUsersPassw=[]
    for (let i = 0; i < newArr.length; i++) {
       newUsersName.push(newArr[i].name)
       newUsersPassw.push(newArr[i].password)
    }
    if (newUsersName[0]==undefined || newUsersName==0) {
        let importUsersSecTempl=`
        <div id="importUsersInpSndSec" class="column aligItCent justySpAr widt95 height100 marginCent">
        <h3 class="marginTop">Hibás fájl! Nem lehet betölteni!</h3>
        <article class="inputsButtonSect column jusySpBtw marginTop widt95">
            <button id="cancelBtn" class="itemsBtn ">OK</button>
        </article>
    </div>
        `
        inputSections.innerHTML=importUsersSecTempl
        const cancelBtn=document.getElementById('cancelBtn')
        cancelBtn.addEventListener("click",()=>{
            inputSectionsClear()
            return
        })
    }
    if (newUsersName[0]!=undefined) {
        let activeNames=JSON.parse(localStorage.users)
        // itt lehet, h kellene egy összehasonlító for cilkus, h akik már benne vannak, azokat ne írja felül. 
        for (let i = 0; i < newUsersName.length; i++) {
            let nameok=newUsersName[i]
            let ok=true
            let z=0
            do {

                if (nameok==activeNames[z].name) {
                    ok=false
                }
                if (ok && z==activeNames.length-1) {
                    indexTempArr.push(i)
                   
                }
                 z++
                if (z==activeNames.length) {
                    ok=false
                }
            } while (ok);

        }
        let importUsersSecTempl=`
        <div id="importUsersInpSndSec" class="column aligItCent justySpAr widt95 height100 marginCent">
        <h3 class="marginTop">Válaszd ki, hogy ki(e)t szeretnél áthozni!</h3>
          
        <table class="table">
            <tr id="headTr" class="">
                <th><input type="checkbox" name="usersAll" id="usersAllChkbx" class="chkbx"></th>
                <th>Név</th>
            </tr>
        `
        for (let i = 0; i < indexTempArr.length; i++) {
            importUsersSecTempl+=`
            <tr>
                <td class="td"><input type="checkbox" name="users${i}" id="" class="chkbx"></td>
                <td class="td">${newUsersName[indexTempArr[i]]}</td>
            </tr>
            `
            
        }
        importUsersSecTempl+=`
        </table>
        <span id="messsage" class="colorRed"></span>
        <article class="inputsButtonSect row jusySpBtw marginTop widt95">
            <button id="oklBtn" class="itemsBtn ">OK</button>
            <button id="cancelBtn" class="itemsBtn ">Mégsem</button>

        </article>
    </div>
        `
        inputSections.innerHTML=importUsersSecTempl
        // cancel btn click
        const cancelBtn=document.getElementById('cancelBtn')
        cancelBtn.addEventListener("click", ()=> inputSectionsClear())
        // select all chkbx
        const usersAllChkbx=document.getElementById('usersAllChkbx')
        const chkbx=document.querySelectorAll('.chkbx')

        usersAllChkbx.addEventListener("click",()=>{
            for (let i = 0; i < chkbx.length; i++) {
                chkbx[i].checked=usersAllChkbx.checked
            }
        })
        // okbtn click
        const oklBtn=document.getElementById('oklBtn')
        oklBtn.addEventListener('click',()=>{
            let chkbxOk=false
            for (let i = 0; i < chkbx.length; i++) {
                if (chkbx[i].checked) {
                    chkbxOk=true
                }
            }
            if (!chkbxOk) {
                const messsage=document.getElementById('messsage')
                messsage.innerHTML="Nincs senki kijelőlve!"
                setTimeout(() => {
                    messsage.innerHTML=""
                }, 2000);
            }
            if (chkbxOk) {
               for (let i = 1; i < chkbx.length; i++) {
                if (chkbx[i].checked) {
                    let axa=indexTempArr[i-1]
                    activeNames.push(newArr[axa])
                }
               }
            //    users template create
             localStorage.removeItem('users')
             localStorage.setItem("users", JSON.stringify(activeNames))
             adminMainAsideClear()
             loadUserJson()
             inputSectionsClear()
             indexTempArr=[]
            }
        })

    }
}



// selected admin user functions

function adminUserActionsSelected(arr,ind) {
    switch (ind) {
        case 0:
        addUser()
            break;
    
        case 1:
            console.log(arr[ind].attributes.title.nodeValue+" gomb megnyomva")
        editUser()
            break;
        case 2:
        deleteUser()
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
    let usersTemp=JSON.parse(localStorage.users)
        isTrue=true
        console.log(newUsNm)
        usersTemp.forEach((val,ind)=>{
            if (usersTemp[ind].name==newUsNm) {
                isTrue=false
                newUserName.style.color="red"
                newUserName.value="Válassz másik nevet!"
                setTimeout(() => {
                    newUsNm=""
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
                        newUsNm=""
                        newPassword.value=""
                        newPassword.removeAttribute('style')
                    }, 3000);
                    return;
                }
            }
        })
        if (newUsNm=="") {
            isTrue=false
            newUserName.style.color="red"
            newUserName.value="Nem írtál be nevet!"
            setTimeout(() => {
                newUserName.value=""
                newUserName.removeAttribute('style')
            }, 3000);
            return;
        }
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
            }, 50);
        }
    })
}

// edit user

function editUser() {
    console.log("edituser fut")
    /*
    -betöltjük a users a localhotból
    - inputsect innerHtml template elkészítése, majd betöltése
    - inputSect megjelenítése

    */ 
   let editUsersTemp=JSON.parse(localStorage.users)
   let editUsersTempl=`
   <div id="inputSectFstCont" class="column aligItCent justySpAr widt95 marginCent height100">
   <h3 class="marginTop" >Felhasználók</h3>
   <label for="users">
   <table class="table">
       <tr id="headTr" class="">
           <th></th>
           <th>Név</th>
       </tr>
   `
   editUsersTemp.forEach((val,ind)=>{
         editUsersTempl+=`
        <tr>
        <td class="td"><input type="radio" name="users" id="" class="radioBtn"></td>
        <td class="td">${editUsersTemp[ind].name}</td>
    </tr>
        `
   })
   editUsersTempl+=`        </table>
   </label>
    <article class="inputsButtonSect row jusySpBtw marginTop widt95">
        <button id="editBtn1st" class="itemsBtn ">Szerkesztés</button>
        <button id="cancelBtn1st" class="itemsBtn ">Mégse</button>
    </article>
    </div>
    <div id="inputSect2ndCont" class="column aligItCent justySpAr widt95 marginCent height100"></div>
    <div id="inputSect3rdCont" class="column aligItCent justySpAr widt95 marginCent height100"></div>

   `
  inputSections.innerHTML=editUsersTempl
  inputSections.classList.add('active')
  const cancelBtn1st=document.getElementById('cancelBtn1st')
//   cancel btn click
  cancelBtn1st.addEventListener("click",()=> {
    inputSectionsClear()
  })
// edit btn click
let editUserInd
let editSecContTempl=``
editBtn1st.addEventListener("click",()=>{
    const radioBtn=document.querySelectorAll('.radioBtn')
    let isTrue=false
    radioBtn.forEach((val,ind)=>{
        if (radioBtn[ind].checked) {
            isTrue=true
            editUserInd=ind
        }
    })
    if (!isTrue) {
        console.log(isTrue)
        inputSectionsClear()
    }
    if (isTrue) {
         if (editUserInd==0) {
            editSecContTempl+=`
            <h3 class="marginTop" >Felhasználó adatainak szerkesztése</h3>
            <h3 class="marginTop" >A felhasználó neve: ${editUsersTemp[editUserInd].name}, jelszava: ${editUsersTemp[editUserInd].password}</h3>
            <article class="column aligItCent inputsCont marginTop">
                <label for="newUsername">Felhasználó neve: ${editUsersTemp[editUserInd].name}</label>
                <input type="hidden" name="newUsername" id="newInputUserName" class="marginTop newInputs editname" value="admin" >
                <label for="newPassword" class="marginTop">Jelszava:</label>
                <input type="text" name="newPassword" id="newPassword" class="marginTop newInputs editpassw" value="${editUsersTemp[editUserInd].password}">   
            </article>
            <article class="inputsButtonSect row jusySpBtw marginTop widt95">
                <button id="editBtn2nd" class="itemsBtn ">Szerkeszt</button>
                <button id="retBtn2nd" class="itemsBtn ">Vissza</button>
                <button id="cancelBtn2nd" class="itemsBtn ">Mégse</button>
            </article>
            `
         }
         if (editUserInd!=0) {
                        editSecContTempl+=`
            <h3 class="marginTop" >Felhasználó adatainak szerkesztése</h3>
            <h3 class="marginTop" >A felhasználó neve: ${editUsersTemp[editUserInd].name}, jelszava: ${editUsersTemp[editUserInd].password}</h3>
            <article class="column aligItCent inputsCont marginTop">
                <label for="newUsername">Felhasználó neve:</label>
                <input type="text" name="newUsername" id="newInputUserName" class="marginTop newInputs editname" value="${editUsersTemp[editUserInd].name}" >
                <label for="newPassword" class="marginTop">Jelszava:</label>
                <input type="text" name="newPassword" id="newPassword" class="marginTop newInputs" value="${editUsersTemp[editUserInd].password}">   
            </article>
            <article class="inputsButtonSect row jusySpBtw marginTop widt95">
                <button id="editBtn2nd" class="itemsBtn ">Szerkeszt</button>
                <button id="retBtn2nd" class="itemsBtn ">Vissza</button>
                <button id="cancelBtn2nd" class="itemsBtn ">Mégse</button>
            </article>
            `
         }
         const inputSectFstCont=document.getElementById('inputSectFstCont')
         const inputSect2ndCont=document.getElementById('inputSect2ndCont')
         inputSect2ndCont.innerHTML=editSecContTempl
        inputSectFstCont.classList.remove('height100')
        inputSect2ndCont.classList.add('active')
        const newUsernameInput=document.getElementById('newInputUserName')
        const newPassword=document.getElementById('newPassword')
        const editBtn2nd=document.getElementById('editBtn2nd')
        let newnameText=newUsernameInput.value
        let newpasswText=newPassword.value
        newUsernameInput.addEventListener("keyup",()=>{
           newnameText=newUsernameInput.value
           console.log(newnameText)
       })
       newPassword.addEventListener("keyup",()=>{
           newpasswText=newPassword.value
           console.log(newpasswText)
       })
        


        // cancel btn click
        const cancelBtn2nd=document.getElementById('cancelBtn2nd')
        cancelBtn2nd.addEventListener("click",()=>{
            inputSectionsClear()
        })
        // return btn click
        const retBtn2nd=document.getElementById('retBtn2nd')
        retBtn2nd.addEventListener("click",()=>{
            inputSectFstCont.classList.add('height100')
            inputSect2ndCont.classList.remove('active')
            editSecContTempl=``
            isTrue=false
            editUserInd=""
            inputSect2ndCont.innerHTML=""
        })
        // edit btn click
        editBtn2nd.addEventListener("click",()=>{
            isOK=true
            // TODO: azt is kellene ellenőrizni, h az admint jelöltem-e ki
            if (editUsersTemp[editUserInd].name=="admin") {
                isOK=true
            }
            if (editUsersTemp[editUserInd].name!="admin") {
                editUsersTemp.forEach((val,ind)=>{
                    if (editUsersTemp[ind].name==newnameText) {
                        isOK=false
                    }
                })
            }

            if (!isOK) {
                newUsernameInput.value=`A ${newnameText} név már foglalt!`
                newUsernameInput.style.color="red"
                setTimeout(() => {
                    newUsernameInput.value=editUsersTemp[editUserInd].name
                    newUsernameInput.removeAttribute('style')
                }, 2000);
            }
            if (isOK) {
                            const  inputSect3rdCont=document.getElementById('inputSect3rdCont')
            let inputSect3rdTempl=`
            <h3 class="marginTop" >A kiválasztott felhasználó új adatai:</h3>
            <h3 class="marginTop" >a korábbi felhasználó neve: ${editUsersTemp[editUserInd].name}, jelszava: ${editUsersTemp[editUserInd].password}</h3>
            <h3 class="marginTop" >Új neve: ${newnameText}, új jelszava: ${newpasswText}</h3>
            <article class="inputsButtonSect row jusySpBtw marginTop widt95">
            <button id="editBtn3nd" class="itemsBtn ">Szerkeszt</button>
            <button id="retBtn3nd" class="itemsBtn ">Vissza</button>
            <button id="cancelBtn3nd" class="itemsBtn ">Mégse</button>
        </article>
        `
        inputSect3rdCont.innerHTML=inputSect3rdTempl
        inputSect3rdCont.classList.add('active')  
        inputSect2ndCont.classList.remove('active')
        const editBtn3nd=document.getElementById('editBtn3nd')
        const retBtn3nd=document.getElementById('retBtn3nd')
        const cancelBtn3nd=document.getElementById('cancelBtn3nd')
        // cancel btn click
        cancelBtn3nd.addEventListener("click",()=>{
            inputSectionsClear()
        })
        // retbtn click
        retBtn3nd.addEventListener("click",()=>{
            inputSect3rdCont.classList.remove('active')  
            inputSect2ndCont.classList.add('active')
            inputSect3rdTempl=``
            newnameText=""
            newpasswText=""
        })
        // edit btn click
        editBtn3nd.addEventListener("click",()=>{
            let newusersJSONTemp=[]
            editUsersTemp.forEach((val,ind)=>{
                if (ind==editUserInd) {
                    let cxhObj={"name":newnameText, "password":newpasswText,}
                    newusersJSONTemp.push(cxhObj)
                }
                if (ind!=editUserInd) {
                    newusersJSONTemp.push(editUsersTemp[ind])
                }
            })
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(newusersJSONTemp))
            adminMainAsideClear()
            loadUserJson()
            inputSectionsClear()
        })
            }
        })
    }
})
}


// delete user

function deleteUser() {
    /*
        - betölteni a user tömböt egy változóba
    - létrehozni az input section-t:
        - táblázat, ahol egyenként, vagy az összeset (kivéve az admint) ki lehet jelölni
        - gombok: törlés és mégsem
    */ 

   let deleteUsersTemp=JSON.parse(localStorage.users)
   let deleteInSecTempl=`
   <div id="inputSectFstCont" class="column aligItCent justySpAr widt95 marginCent height100">
   <h3 class="marginTop" >Felhasználók</h3>
   <table class="table">
       <tr id="headTr" class="">
           <th><input type="checkbox" name="allChk" id="allChk" class="delchkbx"></th>
           <th>Név</th>
       </tr>
   `
   deleteUsersTemp.forEach((val,ind)=>{
    if (deleteUsersTemp[ind].name!="admin") {
        deleteInSecTempl+=`
        <tr>
        <td class="td"><input type="checkbox" name="" class="delchkbx"></td>
        <td class="td">${deleteUsersTemp[ind].name}</td>
    </tr>
        `
    }
   })
   deleteInSecTempl+=`        </table>
    <article class="inputsButtonSect row jusySpBtw marginTop widt95">
        <button id="delBtn1st" class="itemsBtn ">Törlés</button>
        <button id="cancelBtn1st" class="itemsBtn ">Mégse</button>
    </article>
    </div>
    <div id="inputSect2ndCont" class="column aligItCent justySpAr widt95 marginCent height100"></div>
    `
    inputSections.innerHTML=deleteInSecTempl
    inputSections.classList.add('active')

    //    - mégsem gomb megnyitása esetén: inputSectionsClear()
   const cancelBtn1st=document.getElementById('cancelBtn1st')
   cancelBtn1st.addEventListener("click",()=>{
    inputSectionsClear()
   })

//    össes kijelölése törlésre
   const allChk=document.getElementById('allChk')
   const delchkbx=document.querySelectorAll('.delchkbx')
   const delBtn1st=document.getElementById('delBtn1st')
   let chkind=[]
   allChk.addEventListener("click",()=>{
    if (allChk.checked) {
        delchkbx.forEach((val,ind)=>{
            delchkbx[ind].checked=true
        })
    }
    if (!allChk.checked) {
        delchkbx.forEach((val,ind)=>{
            delchkbx[ind].checked=false
        })
    }
   })

    /*
    - törlés gomb esetén: leellenőrizni, h van-e kijelölve vki. 
    - a kijelölt nevek "összegyűjtése". Pontosabban csak az indexet gyűjtjük össze
    */    

   delBtn1st.addEventListener("click", ()=>{
    chkind=[]
    delchkbx.forEach((val,ind)=>{
        // indexek összegyűjtése
        if (delchkbx[ind].checked) {
            if (ind!=0) {
                chkind.push(ind)
            }
        }
    })
    if (chkind.length==0) {
        //  -ha nincs senki kijelölve: inputSectionsClear()
        inputSectionsClear()
        return
    }
    //         - ha van: - inputSection a köv article innerHtml-t létrehozni, zárni az első article-t

    if (chkind.length!=0) {
        const delete2ndCont=document.getElementById('inputSect2ndCont')
        let del2ndTempl=`
        <h3 class="marginTop">A következő felhasználók lesznek törölve:</h3>
        <h3 class="">
        `
        chkind.forEach((ind)=>{
            del2ndTempl+=`${deleteUsersTemp[ind].name},  `
        })
        del2ndTempl+=`
        </h3>
        <article class="inputsButtonSect row jusySpBtw marginTop widt95">
            <button id="delBtn2nd" class="itemsBtn ">Törlés</button>
            <button id="retBtn2nd" class="itemsBtn ">Vissza</button>
            <button id="cancelBtn2nd" class="itemsBtn ">Mégse</button>
        </article>
        `
        delete2ndCont.innerHTML=del2ndTempl
        const deleteFstCont=document.getElementById('inputSectFstCont')
        deleteFstCont.classList.remove('height100')
        delete2ndCont.classList.add('active')
        const cancelBtn2nd=document.getElementById('cancelBtn2nd')
        // mégse gomb
        cancelBtn2nd.addEventListener("click",()=>{
            inputSectionsClear()
        })
        // vissza gomb
        const retBtn2nd=document.getElementById('retBtn2nd')
        retBtn2nd.addEventListener("click",()=>{
            deleteFstCont.classList.add('height100')
            delete2ndCont.classList.remove('active')
            delete2ndCont.innerHTML=""
        })
        // törlés gomb
            // ha tényleg törölni akarjuk, akkor megfordítjuk a tömben található indexek sorrendjét, h
            // ténylegesen azokat töröljük, akiket szeretnénk törölni
            chkind.reverse()
        const delBtn2nd=document.getElementById('delBtn2nd')
        delBtn2nd.addEventListener("click",()=>{
           let arr1=deleteUsersTemp
           let arr2=[]
           chkind.forEach((ind)=>{
            let searchName=deleteUsersTemp[ind].name
            for (let i = 0; i < arr1.length; i++) {
                if (searchName!=arr1[i].name) {
                    arr2.push(arr1[i])
                }
                
            }
            arr1=[]
            arr1=[...arr2]
            arr2=[]
           })
        localStorage.removeItem("users")
        localStorage.setItem("users",JSON.stringify(arr1))
        adminMainAsideClear()
        loadUserJson()
        inputSectionsClear()
        })
       }
    
    })

}

// clear adminaAside

function adminMainAsideClear() {
    adminMainAside.classList.toggle('active')
    adminMainAside.innerHTML=""
}


// END OF USER BUTTON ACTIONS


// input Sections Clear

function inputSectionsClear() {
    inputSections.classList.toggle('active')
    inputSectionsTemplate=``
    setTimeout(() => {
        inputSections.innerHTML=""
    }, 600);
}

