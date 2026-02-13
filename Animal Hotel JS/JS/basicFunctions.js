/**
 * @fileoverview Basic UI functions for menu navigation and loan management
 */

import { hotel } from "./register.js";

// Constants
const LOAN_DURATION = 30;

// DOM Elements
const shopMenu = document.getElementById("shop-menu");
const careMenu = document.getElementById("care-menu");
const bankMenu = document.getElementById("bank-menu");
const guestMenu = document.getElementById("guest-menu");

const shopButton = document.getElementById("open-shop-btn");
const careButton = document.getElementById("animal-care-btn");
const bankButton = document.getElementById("bank-menu-btn");
const guestButton = document.getElementById("guest-menu-btn");



// Initialize menu buttons
showDifferentMenu(shopButton, shopMenu, guestMenu, bankMenu, careMenu);
showDifferentMenu(careButton, careMenu, guestMenu, bankMenu, shopMenu);
showDifferentMenu(bankButton, bankMenu, guestMenu, shopMenu, careMenu);
showDifferentMenu(guestButton, guestMenu, shopMenu, bankMenu, careMenu);

/**
 * Attaches a click event listener to a button that shows one menu and hides others.
 * @param {HTMLElement} button - The button that triggers the menu
 * @param {HTMLElement} menuToShow - The menu div to display
 * @param {HTMLElement} menuToHide1 - First menu div to hide
 * @param {HTMLElement} menuToHide2 - Second menu div to hide
 * @param {HTMLElement} menuToHide3 - Third menu div to hide
 */
function showDifferentMenu(button, menuToShow, menuToHide1, menuToHide2, menuToHide3) {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        menuToShow.style.display = "block";
        menuToHide1.style.display = "none";
        menuToHide2.style.display = "none";
        menuToHide3.style.display = "none";
    });
}

// Loan button elements
const loanMoneyButton100 = document.getElementById("money-btn-100");
const loanMoneyButton500 = document.getElementById("money-btn-500");
const loanMoneyButton1000 = document.getElementById("money-btn-1000");
const loanMoneyButton5000 = document.getElementById("money-btn-5000");

// Initialize loan buttons
takeOutLoan(loanMoneyButton100);
takeOutLoan(loanMoneyButton500);
takeOutLoan(loanMoneyButton1000);
takeOutLoan(loanMoneyButton5000);

/**
 * Attaches a click event listener to a loan button.
 * Handles taking out a loan if one isn't already active.
 * @param {HTMLElement} button - The loan button element
 */
function takeOutLoan(button) {
    let moneyOfUser = document.getElementById("stat-money");

    button.addEventListener('click', function(e) {
        e.preventDefault();

        if (hotel.hasLoan === false) {
            const loanAmount = parseInt(button.textContent.replace(/\D/g, ''));
            const newBalance = hotel.hotelMoney + loanAmount;

            // Update hotel money
            hotel.hotelMoney = newBalance;
            moneyOfUser.textContent = `$${hotel.hotelMoney}`;

            // Set loan status
            hotel.hasLoan = true;
            hotel.dailyFee += Math.floor(loanAmount / LOAN_DURATION);
            hotel.loanDayAmount = LOAN_DURATION;

            // Update daily fee display
            const dailyFeeElement = document.getElementById("stat-daily-fee");
            dailyFeeElement.textContent = `$${hotel.dailyFee}`;
        } else {
            showAlert("You already have a loan. Pay it back before taking out another one.", "💳 Loan Error");
        }
    });
}