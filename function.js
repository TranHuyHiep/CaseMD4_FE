var userSettings = document.querySelector(".user-settings");
var darkBtn = document.getElementById("dark-button");
var LoadMoreBackground =document.querySelector(".btn-LoadMore");
const ACCESS_TOKEN = 'token';
const ID_USER = 'idUser';

function UserSettingToggle(){
    userSettings.classList.toggle("user-setting-showup-toggle");
}
// darkBtn.onclick = function(){
//     darkBtn.classList.toggle("dark-mode-on");
// }a

function darkModeON(){
    darkBtn.classList.toggle("dark-mode-on");
   document.body.classList.toggle("dark-theme");
};

function LoadMoreToggle(){
    LoadMoreBackground.classList.toggle("loadMoreToggle");
};

const id = localStorage.getItem(ID_USER)
loadData(id)

function loadData(id) {
    profileImage = document.getElementsByClassName("profileImg");

    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/user/' + id,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (token) => {
            $(".profileImg").attr("src", token.image)
        },
        error: function (token) {

        }
    })
}

function logout() {
    localStorage.removeItem(ID_USER)
    localStorage.removeItem(ACCESS_TOKEN)
    window.location.href = "login/login.html"
}