//All the menu management functions go here


const createMenu = (x_cord, y_cord, menuobj) => {
    //Assigning a random id
    let menuId = "menu-id" + Math.floor(Math.random() * 100 + 1) + Math.floor(Math.random() * 100 + 1) + new Date().getMilliseconds();
    
    //Creating Menu Container
    let menuContainer = document.createElement('div');
    menuContainer.style.display = "none";
    menuContainer.style.left = x_cord + "px";
    menuContainer.style.top = y_cord + "px";
    menuContainer.id = menuId;
    document.body.appendChild(menuContainer);
    menuContainer.classList.add("menu-container");

    //Creating Menu List
    let menuItems = document.createElement('ul');
    menuItems.classList.add('menu-items');
    menuContainer.appendChild(menuItems);

    //Finding size of the menu object for iteration
    let menuItemSize = Object.keys(menuobj).length;

    //Iterating every item in the menu object
    for(let i = 0; i < menuItemSize; i++){

        //Creating List Item and Button
        let li = document.createElement('li');
        li.classList.add('hidden');
        let button = document.createElement('button');

        //Check if the item has a submenu
        // If the item has a submenu:
        if(menuobj[i][0]){
            
            //Do not forget to add a dispose function to the list item on click event.
            //Two event dispose functions must be handled, one for disposing menu, other for submenu
            //Both the events must be handled here only.


        }

        //Else:
        else{
            
            //Adding text, callback functions for the item from the given menu object
            let textnode = document.createTextNode(menuobj[i][1]);
            button.appendChild(textnode);
            button.addEventListener('click', menuobj[i][2]);
            button.addEventListener('click', () => {disposeMenu(menuId)});
            li.appendChild(button);

            //Delay Fade In of Menu Items
            setTimeout(function(){
                li.classList.remove('hidden');
            }, (i + 1) * 50);
        }

        //Append the menu Item:
        menuItems.appendChild(li);
    }

    //Animate the Menu container (Slide Down) and return the id of the container
    $("#" + menuId).slideDown(100);
    return menuId;
}


const disposeMenu = (menuId) => {
    $("#" + menuId).slideUp(100);
    setTimeout(function(){
        document.body.removeChild(document.getElementById(menuId));
    }, 120);
}