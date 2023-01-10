let moreBtn = document.getElementById("more-btn");
let moreBtnMenuId = ""; //ID of the current open menu triggered using more-btn; initially nothing is open, hence is empty.
let blurlay = document.getElementById("blurlay");
let newRoomDialog = document.getElementById("new-room-dialog");
let roomNameInput = document.getElementById("room-name-input");
let createRoomBtn = document.getElementById("create-room-btn");
let newRoomDialogErrorLine = document.querySelector("#new-room-dialog div.error-line");

moreBtn.addEventListener('click', (evt) => {
    
    //If a menu is already open
    if(moreBtnMenuId){
        //Check if the menu is still open because it is possible that it was closed when user clicked an item in the menu.
        if(document.getElementById(moreBtnMenuId)){
            //Menu is still open CONFIRMED
            disposeMenu(moreBtnMenuId);
            moreBtnMenuId = "";
            return;
        }
    }
    //If no menu is open:
    let viewRect = moreBtn.getBoundingClientRect();
    moreBtnMenuId = createMenu(viewRect.left, viewRect.bottom, moreBtnMenu);
});

roomNameInput.addEventListener('input', () => {
    let roomName = roomNameInput.value;
    let errorCode = isRoomNameWrong(roomName);
    if(errorCode){
        if(errorCode == 1){
            createRoomBtn.disabled = true;
        }else if(errorCode == 2){
            createRoomBtn.disabled = true;
            newRoomDialogErrorLine.style.display = null;
            newRoomDialogErrorLine.innerText = "The name must not be longer than 255 characters.";
        }else if(errorCode){
            createRoomBtn.disabled = true;
            newRoomDialogErrorLine.style.display = null;
            newRoomDialogErrorLine.innerText = "Only alphabets, digits, hyphens and underscores are allowed.";
        }
    }else{
        createRoomBtn.disabled = false;
        newRoomDialogErrorLine.style.display = "none";
        newRoomDialogErrorLine.innerText = "";
    }
})