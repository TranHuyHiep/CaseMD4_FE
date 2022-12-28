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
    let token = localStorage.getItem("token")
    let content = document.getElementById("content").value
    let data = {
        appUser: {
            id : id
        },
        content: content,
        time:"2022-09-22T23:11:28",
        cmtCount: 0,
        likeCount: 0,
        status: 1
    }
    console.log(data)
    if(content.length === 0){
        alert("Chưa có thông tin bài đăng!")
        return
    }
    $.ajax({
        type: 'Post',
        url: "http://localhost:8081/posts",
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        success: function (response){
            alert("Đăng bài thành công!")
            location.reload()
        },
        error:function (err){
            alert("Đăng bài thất bại!")
            console.log(err)
        }

    })
}
function likePost(idPost){
    const id = localStorage.getItem("idUser")
    let like = {
        appUser: {
            id : id
        },
        post:{
            id: idPost
        }
    }
    $.ajax({
        type: 'post',
        data: JSON.stringify(like),
        url:'http://localhost:8081/likes',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (response){
            location.reload()
        },
        error:function (err){
            console.log(err)
        }
    })
}

function logout() {
    localStorage.removeItem(ID_USER)
    localStorage.removeItem(ACCESS_TOKEN)
    window.location.href = "/login/login.html"
}

loadInfo()
getAllPostByUser()