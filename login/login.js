function login() {
    var user=$("#username").val();
    var pass=$("#password").val();

    let data = {
        user: user,
        password: pass
    }

    if(user!="" && pass!="") {
        $.ajax
        ({
            type: 'post',
            url: '',
            data: JSON.stringify(data),
            success: function (response) {
                if (response == "success") {
                    window.location.href = "../index.html"
                } else {
                    alert("Wrong Details");
                }
            }
        });
    }
}