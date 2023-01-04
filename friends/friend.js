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
    window.location.href = "../login/login.html"
}

var input = document.getElementById("search");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        localStorage.setItem("search", input.value)
        window.location.href = "friend.html"
    }
});

LoadFriend()
function LoadFriend() {
    var nameSearch = localStorage.getItem("search")
    var token = localStorage.getItem(ACCESS_TOKEN)

    document.getElementById('search').value = nameSearch

    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/user/displayname/' + nameSearch,
        headers: {
            'Content-Type': 'application/json',
            'beartoken': token
        },
        success: (data) => {
            for (let i = 0; i < data.length; i++) {
                if(data[i].id != id) {
                    check = false
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8081/relationship/' + id + '/' + data[i].id,
                        success: (data1) => {
                            if(data1.length != 0) {
                                if(data1.relationType.id == 2) {
                                    document.getElementById('display').innerHTML += "<div class=\"user-profile-box\">\n" +
                                        "                <div class=\"user-profile\">\n" +
                                        "                    <img src=\'" + data[i].image + "' alt=\"\">\n" +
                                        "                    <div>\n" +
                                        "                        <p>" + data[i].displayName + "</p>\n" +
                                        "                        <small>" + data[i].aboutMe + "</small>\n" +
                                        "                    </div>\n" +
                                        "                </div>\n" +
                                        "                <div>\n" +
                                        "                    <button onclick=\"huyketban(" + data[i].id + ")\">Hủy kết bạn</button>\n" +
                                        "                </div>\n" +
                                        "            </div>\n"
                                } else if(data1.relationType.id == 1) {
                                    document.getElementById('display').innerHTML += "<div class=\"user-profile-box\">\n" +
                                        "                <div class=\"user-profile\">\n" +
                                        "                    <img src=\'" + data[i].image + "' alt=\"\">\n" +
                                        "                    <div>\n" +
                                        "                        <p>" + data[i].displayName + "</p>\n" +
                                        "                        <small>" + data[i].aboutMe + "</small>\n" +
                                        "                    </div>\n" +
                                        "                </div>\n" +
                                        "                <div>\n" +
                                        "                    <button onclick=\"huyketban(" + data[i].id + ")\">Bạn bè</button>\n" +
                                        "                </div>\n" +
                                        "            </div>\n"
                                }
                            }
                            else {
                                $.ajax({
                                    type: 'GET',
                                    url: 'http://localhost:8081/relationship/' + data[i].id + '/' + id,
                                    success: (data1) => {
                                        if(data1.length != 0) {
                                            if(data1.relationType.id == 2) {
                                                document.getElementById('display').innerHTML += "<div class=\"user-profile-box\">\n" +
                                                    "                <div class=\"user-profile\">\n" +
                                                    "                    <img src=\'" + data[i].image + "' alt=\"\">\n" +
                                                    "                    <div>\n" +
                                                    "                        <p>" + data[i].displayName + "</p>\n" +
                                                    "                        <small>" + data[i].aboutMe + "</small>\n" +
                                                    "                    </div>\n" +
                                                    "                </div>\n" +
                                                    "                <div>\n" +
                                                    "                    <button onclick=\"chapnhan(" + data[i].id + ")\">Đồng ý kết bạn</button>\n" +
                                                    "                    <button onclick=\"tuchoi(" + data[i].id + ")\">Từ chối kết bạn</button>\n" +
                                                    "                </div>\n" +
                                                    "            </div>\n"
                                            } else if(data1.relationType.id == 1) {
                                                document.getElementById('display').innerHTML += "<div class=\"user-profile-box\">\n" +
                                                    "                <div class=\"user-profile\">\n" +
                                                    "                    <img src=\'" + data[i].image + "' alt=\"\">\n" +
                                                    "                    <div>\n" +
                                                    "                        <p>" + data[i].displayName + "</p>\n" +
                                                    "                        <small>" + data[i].aboutMe + "</small>\n" +
                                                    "                    </div>\n" +
                                                    "                </div>\n" +
                                                    "                <div>\n" +
                                                    "                    <button onclick=\"huyketban(" + data[i].id + ")\">Bạn bè</button>\n" +
                                                    "                </div>\n" +
                                                    "            </div>\n"
                                            }
                                        }
                                        else if(data[i].id != id){
                                            document.getElementById('display').innerHTML += "<div class=\"user-profile-box\">\n" +
                                                "                <div class=\"user-profile\">\n" +
                                                "                    <img src=\'" + data[i].image + "' alt=\"\">\n" +
                                                "                    <div>\n" +
                                                "                        <p>" + data[i].displayName + "</p>\n" +
                                                "                        <small>" + data[i].aboutMe + "</small>\n" +
                                                "                    </div>\n" +
                                                "                </div>\n" +
                                                "                <div>\n" +
                                                "                    <button onclick=\"ketban(" + data[i].id + ")\">Kết bạn</button>\n" +
                                                "                </div>\n" +
                                                "            </div>\n"
                                        }
                                    }
                                })
                            }
                        },
                        error: function (data1) {

                        }
                    })
                }
            }


        },
            error: function (data) {
        }
    })
}


function ketban(sendid) {
    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/relationship/sentFriendRequest/' + id + '/' + sendid,
        success: (token) => {
            window.location.href = "friend.html"
        },
        error: function (token) {
            window.location.href = "friend.html"
        }
    })
}

function huyketban(sendid) {
    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/relationship/cancelFriendRequest/' + id + '/' + sendid,
        success: (token) => {
            window.location.href = "friend.html"
        },
        error: function (token) {
            window.location.href = "friend.html"
        }
    })
}

function chapnhan(sendid) {
    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/relationship/acceptFriendRequest/' + sendid + '/' + id,
        success: (token) => {
            window.location.href = "friend.html"
        },
        error: function (token) {
            window.location.href = "friend.html"
        }
    })
}

