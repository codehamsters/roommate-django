
const showNewRoomDialog = () => {
    $(blurlay).fadeIn(100);
    newRoomDialog.classList.remove("hidden");
}

const closeNewRoomDialog = () => {
    newRoomDialog.classList.add("hidden");
    $(blurlay).fadeOut(100);
}

const disposeDialogs = () =>{
    closeNewRoomDialog();
}

blurlay.addEventListener('click', (evt) => {
    if (evt.target == blurlay){
        disposeDialogs();
    }
})