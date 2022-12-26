var userSettings = document.querySelector(".user-settings");
var darkBtn = document.getElementById("dark-button");
var LoadMoreBackground =document.querySelector(".btn-LoadMore");
function UserSettingToggle(){
    userSettings.classList.toggle("user-setting-showup-toggle");
}
// darkBtn.onclick = function(){
//     darkBtn.classList.toggle("dark-mode-on");
// }

function darkModeON(){
    darkBtn.classList.toggle("dark-mode-on");
    document.body.classList.toggle("dark-theme");
}

function LoadMoreToggle(){
    LoadMoreBackground.classList.toggle("loadMoreToggle");
}

function getAllPostByUser(){
    let id = localStorage.getItem("iduser");
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
                                    <p>${item.appUser.account.username}</p>
                                    <small>${item.time}</small>
                                </div>
                            </div>
<!--                            <div>-->
<!--                                <a href="#"><i class="fas fa-ellipsis-v"></i></a>-->
<!--                            </div>-->
                        </div>
                        <div class="status-field">
                            <p>
                                ${item.content}
                            </p>
<!--                            <img src="../images/feed-image-1.png" alt="">-->

                        </div>
                        <div class="post-reaction">
                            <div class="activity-icons">
                                <div ><img onclick="likePost()" src="../images/like-blue.png" alt="">${item.likeCount}</div>
                                <div><img src="../images/comments.png" alt="">${item.cmtCount}</div>
                                <div><img src="../images/share.png" alt="">100</div>
                            </div>
<!--                            <div class="post-profile-picture">-->
<!--                                <img src="../images/profile-pic.png " alt=""> <i class=" fas fa-caret-down"></i>-->
<!--                            </div>-->
                        </div>
                    </div>`
            })

            $("#post-content").html(html);
        }
    });
}

function loadInfo(){
    let id = localStorage.getItem("iduser");
    $.ajax({
        type: 'get',
        url: 'http://localhost:8081/user/1',
        success: function (response) {
            console.log("../images/" + response.bgimage);
            let html = `<img src="../images/${response.bgimage}" className="coverImage" alt="Ảnh bìa">`
            // let html = `../images/${response.bgimage}`
            $("#background").src(html)
            $("#profile").src = "../images/" + response.image
        }
    })
}
function likePost(){
    $.ajax({
        type: 'post',
        url:'http://localhost:8081/like/1/1',
    })
}

// loadInfo()
getAllPostByUser()