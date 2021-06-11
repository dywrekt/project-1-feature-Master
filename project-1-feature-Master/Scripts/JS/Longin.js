function ValidateEmail() {
    var form = document.getElementById("form");
    var email = document.getElementById("email");
    var text = document.getElementById("text");
    var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email.value.match(pattern)) {
        form.classList.remove("invalid");
        form.classList.add("valid");

    } else {
        form.classList.add("invalid");
        form.classList.remove("valid");

        return false;
    }

    if (email == "") {
        form.classList.remove("valid");
        form.classList.remove("invalid");
    }

    return true;
}