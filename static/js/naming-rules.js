const isRoomNameWrong = (roomName) => {
    if(!roomName.length){
        return 1;   //EMPTY ERROR
    }
    if(roomName.length > 255){
        return 2;   //LENGTH ERROR
    }
    
    for(let i = 0; i < roomName.length; i++){
        let ascii = roomName.charCodeAt(i)
        if( ascii >= 65 && ascii <= 90 ){   //CAPTIAL LETTERS
            sssssssssss
        }else if( ascii >= 97 && ascii <= 122){ //CURSIVE LETTERS

        }else if( ascii >= 48 && ascii <= 57){  //DIGITS

        }else if(ascii == 45 || ascii == 95){   //HYPHEN AND UNDERSCORE

        }else{
            return 3;   //INVALID CHARACTER ERROR
        }
    }
    return 0;
}

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