const submitBtn = document.querySelector("#submit");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

submitBtn.addEventListener("click", () => {
  if (email.value == "") {
    alert("Email should not be empty!");
    return;
  }
  if (password.value == "") {
    alert("Password should not be empty");
    return;
  }
  if (confirmPassword.value != password.value) {
    alert("Password and confirm password does not match!");
    return;
  }
});
