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

    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/user/' + id,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (token) => {
            $(".profileImg").attr("src", "images/" + token.image)
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

var input = document.getElementById("search");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        localStorage.setItem("search", input.value)
        window.location.href = "friends/friend.html"
    }
});

function gotoindfex() {
    window.location.href = "../index.html.html"
}