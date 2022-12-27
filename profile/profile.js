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
    let id = localStorage.getItem("idUser");
    console.log(id)
    $.ajax({
        type: 'get',
        url: 'http://localhost:8081/posts/profile/' + id,
        success: function (response) {
            console.log(response)
            let html = "";
            response.forEach((item, index) => {
                html += `<div class="status-field-container write-post-container">
                        <div class="user-profile-box">
                            <div class="user-profile">
                                <img src="../images/${item.appUser.image}" alt="Ảnh đại diện">
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
                                <div ><img onclick="likePost()" src="../images/like-blue.png" alt="">${item.likeCount}</div>
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

function loadInfo(){
    let id = localStorage.getItem("idUser");
    $.ajax({
        type: 'get',
        url: 'http://localhost:8081/user/'+id,
        success: function (response) {
            $("#background").attr("src","../images/" + response.bgimage)
            $(".profile").attr("src","../images/" + response.image)
            $(".nameProfile").html(response.displayName)
            $("#about-me").html(response.aboutMe)
            $("#phone").html(response.phoneNumber)
            $("#live").html(response.address)
            $("#email").html(response.email)
        }
    })
}
function postStatus(){
    let id = localStorage.getItem("idUser")
    alert("Click")
    let data = {
        content: document.getElementById("content"),
        time:"2022-09-22 23:11:28",
        cmtCount: 0,
        likeCount: 0
    }
    $.ajax({
        type: 'Post',
        url: "http://localhost:8081/posts",
        data: JSON.stringify(data),
        success: function (response){
            alert("Đăng bài thành công!")
            alert(response)
        },
        error:function (err){
            console.log(err)
        }

    })
}
function likePost(){
    alert("like");
    $.ajax({
        type: 'post',
        url:'http://localhost:8081/like/1/1',
    })
}

loadInfo()
getAllPostByUser()