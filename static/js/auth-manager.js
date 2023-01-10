let tabgroupBtns = document.querySelectorAll("#tabgroup button");
let forms = document.querySelectorAll("#form-container form");
let registrationEmailField = document.querySelector("#registration-form input.email");
let registrationUsernameField = document.querySelector("#registration-form input.username");
let registrationPasswordField = document.querySelector("#registration-form input.password");
let registrationShowPasswordLabel = document.querySelector("#registration-form label.show-password-txt");
let loginEmailField = document.querySelector("#login-form input.username");
let loginPasswordField = document.querySelector("#login-form input.password");
let loginShowPasswordLabel = document.querySelector("#login-form label.show-password-txt");

const toggleForm = (formElement, readOnly) => {
    let elements = formElement.elements;
    for(let i = 0; i < elements.length; i++){
        elements[i].readOnly = readOnly;
    }
}

const togglePassword = (formType, newState) => {
    
    if (formType == "registration"){
        if(newState){
            registrationPasswordField.type = "text";
            registrationShowPasswordLabel.innerText = "Hide Password";
        }else{
            registrationPasswordField.type = "password";
            registrationShowPasswordLabel.innerText = "Show Password";
        }
    } else if (formType == "login"){
        if(newState){
            loginPasswordField.type = "text";
            loginShowPasswordLabel.innerText = "Hide Password";
        }else{
            loginPasswordField.type = "password";
            loginShowPasswordLabel.innerText = "Show Password";
        }
    }
}

const switchTab = (i) => {
    let j = i ? 0 : 1;
    tabgroupBtns[i].classList.add('active');
    forms[i].classList.remove('inactive');
    console.log(forms[i].classList);
    tabgroupBtns[j].classList.remove('active');
    forms[j].classList.add('inactive');
    setTimeout(() => {
        toggleForm(forms[i], false);
        toggleForm(forms[j], true);
        i ? loginEmailField.focus() : registrationEmailField.focus();
    }, 300);
}

for(let i = 0; i < tabgroupBtns.length; i++){
    tabgroupBtns[i].addEventListener('click', () => switchTab(i));
}

loginShowPasswordLabel.addEventListener('click', () => {
    togglePassword("login", loginPasswordField.type == "password");
})
registrationShowPasswordLabel.addEventListener('click', () => {
    togglePassword("registration", registrationPasswordField.type == "password");
})