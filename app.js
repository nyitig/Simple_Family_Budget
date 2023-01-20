// loginBtn click
let jsonTemp
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

loginBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    fetch("/json/./user.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        jsonTemp=jsondata
        console.log(jsondata)
    }
        );
})





