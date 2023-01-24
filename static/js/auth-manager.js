let tabgroupBtns = document.querySelectorAll("#tabgroup button");
let forms = document.querySelectorAll("#form-container form");
let registrationEmailField = document.querySelector("#registration-form .input-box.email input");
let registrationEmailErrorMessage = document.querySelector("#registration-email-error-message");
let registrationUsernameField = document.querySelector("#registration-form .input-box.username input");
let registrationUsernameErrorMessage = document.querySelector("#registration-username-error-message");
let registrationPasswordField = document.querySelector("#registration-form .input-box.password input");
let registrationShowPasswordLabel = document.querySelector("#registration-form label.show-password-txt");
let loginUsernameField = document.querySelector("#login-form .input-box.username input");
let loginPasswordField = document.querySelector("#login-form .input-box.password input");
let loginShowPasswordLabel = document.querySelector("#login-form label.show-password-txt");
let invalidityIndicators = document.querySelectorAll("#form-container form .input-box .invalidity-indicator");
let invalidityTooltips = document.querySelectorAll("#form-container form .input-box .invalidity-indicator .message");
let fields = [registrationEmailField, registrationUsernameField, registrationPasswordField, loginUsernameField, loginPasswordField];

//Event Listener to Show / Hide Tooltip of Invalid Input Boxes
for(let i = 0; i < invalidityIndicators.length; i++){
    invalidityIndicators[i].addEventListener("mouseover", () => {
        invalidityTooltips[i].classList.add("tooltipped");
    })
    invalidityIndicators[i].addEventListener("mouseout", () => {
        invalidityTooltips[i].classList.remove("tooltipped");
    })
}

//Event Listener to Focus / Blur the input box correctly
for(let i = 0; i < fields.length; i++){
    fields[i].addEventListener('focus', (evt) => {
        evt.target.parentElement.classList.add("focus");
    })
    fields[i].addEventListener('blur', (evt) => {
        evt.target.parentElement.classList.remove("focus")
    })
}

//Completely disable the elements of a form when it is inactive
const toggleForm = (formElement, readOnly) => {
    let elements = formElement.elements;
    for(let i = 0; i < elements.length; i++){
        elements[i].readOnly = readOnly;
    }
}


// Show Hide Password Functionality
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
loginShowPasswordLabel.addEventListener('click', () => {
    togglePassword("login", loginPasswordField.type == "password");
})
registrationShowPasswordLabel.addEventListener('click', () => {
    togglePassword("registration", registrationPasswordField.type == "password");
})

//Switch between Forms functionality
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
        i ? loginUsernameField.focus() : registrationEmailField.focus();
    }, 300);
}
for(let i = 0; i < tabgroupBtns.length; i++){
    tabgroupBtns[i].addEventListener('click', () => switchTab(i));
}


//Event listener to listen for wrong inputs in registration form, and display message.
registrationEmailField.addEventListener('input', () => {
    setTimeout(() => {  //Timeout is required because, the content of registrationEmailErrorMessage changes after some time of input event
        let message = registrationEmailErrorMessage.textContent;
        if(message){
            registrationEmailField.parentElement.classList.add("invalid");
        }else{
            registrationEmailField.parentElement.classList.remove("invalid");
        }
    }, 100);
    
})


