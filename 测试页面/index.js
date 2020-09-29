const sideContainer = document.getElementsByClassName('side-container')[0];
const lis = sideContainer.children;
const menu = document.getElementsByClassName('menu')[0];
const menuLis = menu.children;
const container = document.getElementsByClassName('container')[0];
/**
 * 侧边栏切换
 */
function changeSide() {
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            for (let j = 0; j < lis.length; j++) {
                lis[j].className = 'item';
            }
            this.className = 'item active';
        }
    }
}
changeSide();

/**
 * 导航栏切换
 */
function changeMenu() {
    for (let i = 0; i < menuLis.length; i++) {
        menuLis[i].onclick = function () {
            for (let j = 0; j < menuLis.length; j++) {
                menuLis[j].className = '';
            }
            this.className = 'active';
            let attr = this.id;
            changeContainer(attr);
        }
    }
}
changeMenu();
changeContainer('an')
/**
 * 内容切换
 */
function changeContainer(id) {
    let myId = document.getElementsByClassName(id)[0];
    for (let i = 0; i < menuLis.length; i++) {
        container.children[i].style.display = 'none'
    }
    for (let i = 0; i < menuLis.length; i++) {
        myId.style.display = 'block'
    }
}