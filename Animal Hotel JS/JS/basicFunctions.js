const shopMenu = document.getElementById("shop-menu");
const careMenu = document.getElementById("care-menu");
const bankMenu = document.getElementById("bank-menu")
const guestMenu = document.getElementById("guest-menu");

const shopButton = document.getElementById("open-shop-btn");
const careButton = document.getElementById("animal-care-btn");
const bankButton = document.getElementById("bank-menu-btn");
const guestButton = document.getElementById("guest-menu-btn");

showDifferentMenu(shopButton, shopMenu, guestMenu, bankMenu, careMenu);
showDifferentMenu(careButton, careMenu, guestMenu, bankMenu, shopMenu);
showDifferentMenu(bankButton, bankMenu, guestMenu, shopMenu, careMenu);
showDifferentMenu(guestButton, guestMenu, shopMenu, bankMenu, careMenu);


function showDifferentMenu(button, menuToShow, menuToHide1, menuToHide2, menuToHide3){
    button.addEventListener('click', function(e){
        e.preventDefault();

        menuToShow.style.display = "block";
        menuToHide1.style.display = "none";
        menuToHide2.style.display = "none";
        menuToHide3.style.display = "none";
    })
}