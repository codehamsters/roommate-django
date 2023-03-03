const isRoomNameWrong = (roomName) => {
    if(!roomName.length){
        return 1;   //EMPTY ERROR
    }
    if(roomName.length > 255){
        return 2;   //LENGTH ERROR
    }
    
    for(let i = 0; i < roomName.length; i++){
        let ascii = roomName.charCodeAt(i);
        if( ascii >= 65 && ascii <= 90 ){   //CAPTIAL LETTERS
            
        }else if( ascii >= 97 && ascii <= 122){ //CURSIVE LETTERS

        }else if( ascii >= 48 && ascii <= 57){  //DIGITS

        }else if(ascii == 32 || ascii == 45 || ascii == 46 || ascii == 95){   //PERIOD, HYPHEN, WHITESPACE AND UNDERSCORE

        }else{
            return 3;   //INVALID CHARACTER ERROR
        }
    }
    return 0;
}
