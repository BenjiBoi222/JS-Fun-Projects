import { hotel } from "./register.js";

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

const loanMoneyButton100 = document.getElementById("money-btn-100");
const loanMoneyButton500 = document.getElementById("money-btn-500");
const loanMoneyButton1000 = document.getElementById("money-btn-1000");
const loanMoneyButton5000 = document.getElementById("money-btn-5000");
takeOutLoan(loanMoneyButton100);
takeOutLoan(loanMoneyButton500);
takeOutLoan(loanMoneyButton1000);
takeOutLoan(loanMoneyButton5000);

function takeOutLoan(button){
    let moneyOfUser = document.getElementById("stat-money");

    button.addEventListener('click',function(e){
        e.preventDefault();
        if(hotel.hasLoan == false){
            let money = hotel.hotelMoney;
            const loanAmount = parseInt(button.textContent.replace(/\D/g, ''));
            money += loanAmount;
            hotel.hotelMoney = money;
            moneyOfUser.textContent = `$${hotel.hotelMoney}`;
            hotel.hasLoan = true;
            hotel.dailyFee += Math.floor(loanAmount / 30);
            hotel.loanDayAmount = 30;
            const dailyFeeElement = document.getElementById("stat-daily-fee");
            dailyFeeElement.textContent = `$${hotel.dailyFee}`;
        }else{
            alert("You already have a loan. Pay it back before taking out another one.");
        }
    })
}