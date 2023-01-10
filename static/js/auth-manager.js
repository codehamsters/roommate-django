let tabgroupBtns = document.querySelectorAll("#tabgroup button");
let forms = document.querySelectorAll("#form-container form");

const switchTab = (k) => {
    for(let i = 0; i < tabgroupBtns.length; i++){
        if(k == i){
            tabgroupBtns[k].classList.add('active');
            forms[k].classList.remove('inactive');
        }else{
            tabgroupBtns[i].classList.remove('active');
            forms[i].classList.add('inactive');
        }
    }
}

for(let i = 0; i < tabgroupBtns.length; i++){
    tabgroupBtns[i].addEventListener('click', () => switchTab(i))
}