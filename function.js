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
getAllPost();
function getAllPost(){
    let id = localStorage.getItem("idUser");
    console.log(id)
    $.ajax({
        type: 'get',
        url: 'http://localhost:8081/posts/home/'+ id,
        success: function (response) {
            console.log(response)
            let html = "";
            response.forEach((item, index) => {
                html += `<div class="status-field-container write-post-container">
                        <div class="user-profile-box">
                    <div class="user-profile">
                        <img src="images/${item.appUser.image}" alt="Ảnh đại diện">
                        <div>
                            <p>${item.appUser.displayName}</p>
                            <small>${item.time}</small>
                        </div>
                    </div>
                </div>
                <div class="status-field">
                    <p>
                     ${item.content}
                    </p>

                </div>
                <div class="post-reaction">
                    <div class="activity-icons">
                        <div><img onclick="likePost(${item.id})" src="images/like-blue.png" alt="">${item.likeCount}</div>
                        <div><img src="images/comments.png" alt="">${item.cmtCount}</div>
                        <div><img src="images/share.png" alt="">100</div>
                    </div>
                </div>
                    </div>`
            })

            $("#post-friend-content").html(html);
        }
    });
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

function getAllPost(){
    // let id = localStorage.getItem("idUser");
    // console.log(id)
    $.ajax({
        type: 'get',
        url: 'http://localhost:8081/posts',
        success: function (response) {
            console.log(response)
            let html = "";
            response.forEach((item, index) => {
                html += `<div class="status-field-container write-post-container">

                    <div class="user-profile-box">
                        <div class="user-profile">
                            <img src="../images/${item.appUser.image}" alt="">
                            <div>
                                <p>${item.appUser.displayName}</p>
                                <small>${item.time}</small>
                            </div>
                        </div>
                        <div>
                            <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                        </div>
                    </div>
                    <div class="status-field">
                            <p>
                                ${item.content}
                            </p>
                        <img src="images/feed-image-1.png" alt="">

                    </div>
                    <div class="post-reaction">
                            <div class="activity-icons">
                                <div ><img onclick="likePost(${item.id})" src="../images/like-blue.png" alt="">${item.likeCount}</div>
                                <div><img src="../images/comments.png" alt="">${item.cmtCount}</div>
                                <div><img src="../images/share.png" alt="">100</div>
                            </div>
                    </div>
                </div>`
            })

            $("#post-content").html(html);
        }
    });
}

function gotoindfex() {
    window.location.href = "../index.html.html"
}

getAllPost()