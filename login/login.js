const ACCESS_TOKEN = 'token';
const ID_USER = 'idUser';

function login() {
    const username = $("#username").val();
    const password = $("#password").val();
    const Account = {
        username: username,
        password: password
    }
    const RESPONSE_FAIL = 'Fail'
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/account/login',
        data: JSON.stringify(Account),
        headers: {
            'Content-Type': 'application/json'
        },
        success: (token) => {
            console.log(token)
            if (token.token !== RESPONSE_FAIL) {
                localStorage.setItem(ACCESS_TOKEN, token.token);
                localStorage.setItem(ID_USER, token.userId);
                alert("Đăng nhập thành công")
                window.location.href = "../index.html"
            }
        },
        error: function (token) {
            console.log(token)
            const notification = `<p style="color: #e05353">Sai tài khoản hoặc mật khẩu</p>`;
            $('#body-notification').html(notification);
            const div_notification = $('#notification');
            const toast = new bootstrap.Toast(div_notification)
        }
    })
}