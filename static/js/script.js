let moreBtn = document.getElementById("more-btn");
let moreBtnMenuId = ""; //ID of the current open menu triggered using more-btn; initially nothing is open, hence is empty.
let blurlay = document.getElementById("blurlay");
let newRoomDialog = document.getElementById("new-room-dialog");

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