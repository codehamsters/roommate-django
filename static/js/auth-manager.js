let tabgroupBtns = document.querySelectorAll("#tabgroup button");
let forms = document.querySelectorAll("#form-container form");
let registrationEmailField = document.querySelector("#registration-form .input-box.email input");
let registrationEmailErrorMessage = document.querySelector("#registration-email-error-message");
let registrationUsernameField = document.querySelector("#registration-form .input-box.username input");
let registrationUsernameErrorMessage = document.querySelector("#registration-username-error-message");
let registrationPasswordField = document.querySelector("#registration-form .input-box.password input");
let registrationShowPasswordLabel = document.querySelector("#registration-form label.show-password-txt");
let registrationSubmitBtn = document.querySelector('#registration-form button.submit-btn');
let loginErrorMessage = document.querySelector("#login-error-message");
let loginUsernameField = document.querySelector("#login-form .input-box.username input");
let loginPasswordField = document.querySelector("#login-form .input-box.password input");
let loginShowPasswordLabel = document.querySelector("#login-form label.show-password-txt");
let loginSubmitBtn = document.querySelector('#login-form button.submit-btn');
let invalidityIndicators = document.querySelectorAll("#form-container form .input-box .invalidity-indicator");
let invalidityTooltips = document.querySelectorAll("#form-container form .input-box .invalidity-indicator .message");
let fields = [registrationEmailField, registrationUsernameField, registrationPasswordField, loginUsernameField, loginPasswordField];
let loader = document.querySelector('#loader');


//Hiding the loader once the page is loaded:
function hideLoader(){
    loader.classList.add("hidden");
    document.body.classList.remove("unclickable");
}
function showLoader(){
    loader.classList.remove("hidden");
    document.body.classList.add("unclickable");
}
hideLoader();

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

//Auto switch to login tab when the page loads with a login error message.
if(loginErrorMessage){
    tabgroupBtns[1].click();
}

// Disabling Form Submit button on wrong input
const toggleRegistrationSubmitBtn = () => {
    if(!(registrationEmailField.value && registrationUsernameField.value && registrationPasswordField.value)){
        registrationSubmitBtn.disabled = true;
    }else if(registrationEmailErrorMessage.textContent || registrationUsernameErrorMessage.textContent){
        registrationSubmitBtn.disabled = true;
    }else{
        registrationSubmitBtn.disabled = false;
    }
}
const toggleLoginSubmitBtn = () => {
    if(!(loginUsernameField.value && loginPasswordField.value)){
        loginSubmitBtn.disabled = true;
    }else{
        loginSubmitBtn.disabled = false;
    }
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
        toggleRegistrationSubmitBtn();
    }, 50);
    
});

registrationUsernameField.addEventListener('input', () => {
    setTimeout(() => {  //Timeout is required because, the content of registrationEmailErrorMessage changes after some time of input event
        let message = registrationUsernameErrorMessage.textContent;
        if(message){
            registrationUsernameField.parentElement.classList.add("invalid");
        }else{
            registrationUsernameField.parentElement.classList.remove("invalid");
        }
        toggleRegistrationSubmitBtn();
    }, 100);
    
});

registrationPasswordField.addEventListener('input', () => {
    toggleRegistrationSubmitBtn();
})

loginUsernameField.addEventListener('input', () => {
    toggleLoginSubmitBtn();
})

loginPasswordField.addEventListener('input', () => {
    toggleLoginSubmitBtn();
})

//Showing the loader on form submit:
for(let i = 0; i < forms.length; i++){
    forms[i].addEventListener('submit', showLoader);
}