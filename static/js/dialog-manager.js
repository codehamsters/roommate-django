
const showNewRoomDialog = () => {
    $(blurlay).fadeIn(100);
    newRoomDialog.classList.remove("hidden");
}

const closeNewRoomDialog = () => {
    newRoomDialog.classList.add("hidden");
    $(blurlay).fadeOut(100);
}