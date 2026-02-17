/**
 * @fileoverview Main game functions for animal check-in/out and gameplay mechanics
 */

import { Animal } from "./animal.js";
import { SystemFunctions } from "./systemFunctions.js";
import { Randomizer } from "./randomizer.js";
import { hotel } from "./register.js";
import { updateXpDisplay, toggleEmptyMessages } from "./utils.js";

// Constants
const TOTAL_HOTEL_SPACES = 4;

// DOM Elements
const checkInButton = document.getElementById("check-in-btn");
const divToShow = document.getElementById("animal-selection");
const animalOutButton = document.getElementById("check-out-btn");
const passDayButton = document.getElementById("pass-day-btn");

// Event listeners
checkInButton.addEventListener('click', toggleAnimalSelection);
animalOutButton.addEventListener('click', checkOutAnimal);
passDayButton.addEventListener('click', passDay);

/**
 * Toggles the visibility of the animal selection menu.
 * @param {Event} e - The click event
 */
function toggleAnimalSelection(e) {
    e.preventDefault();
    if (divToShow.style.display === "none") {
        if (SystemFunctions.animalsInLine.length > 0) {
            for (let i = 1; i <= SystemFunctions.animalsInLine.length; i++) {
                const animalOption = document.getElementById(`animal-select-${i}`);
                const animal = SystemFunctions.animalsInLine[i - 1];
                animalOption.textContent = `${animal.name} the ${animal.animalType} | size: ${animal.animalSize} | days left: ${animal.amountOfDayLeft} | Money: $${animal.moneyForAnimal} | Xp: ${animal.xp}`;
            }
        }
        divToShow.style.display = "grid";
    } else {
        divToShow.style.display = "none";
    }
}

// Add event listeners to animal selection buttons
for (let i = 1; i <= 5; i++) {
    const button = document.getElementById(`animal-select-${i}`);
    button.addEventListener('click', checkInSelectedAnimal);
}

/**
 * Handles checking in a selected animal to the hotel.
 * @param {Event} e - The click event
 */
function checkInSelectedAnimal(e) {
    e.preventDefault();
    const index = parseInt(this.id.split("-")[2]) - 1;

    if (SystemFunctions.animalsInLine.length === 0 || index >= SystemFunctions.animalsInLine.length) {
        alert("No animal available in this slot!");
        return;
    }

    const animalToCheckIn = SystemFunctions.animalsInLine[index];
    if (hotel.hotelCapacity >= animalToCheckIn.animalSize) {
        alert(`You checked in ${animalToCheckIn.name} the ${animalToCheckIn.animalType}!`);

        hotel.addAnimal(animalToCheckIn);
        hotel.hotelCapacity -= animalToCheckIn.animalSize;
        const capacityStat = document.getElementById("stat-capacity");
        capacityStat.textContent = `${TOTAL_HOTEL_SPACES - hotel.hotelCapacity} / ${TOTAL_HOTEL_SPACES}`;
        divToShow.style.display = "none";

        SystemFunctions.removeAnimal(animalToCheckIn);
        SystemFunctions.fillAnimalLine();

        updateGuestList();
    } else {
        alert(`You don't have enough space to check in ${animalToCheckIn.name} the ${animalToCheckIn.animalType}!`);
    }
}

/**
 * Generates a formatted string of an animal's current needs.
 * Only includes needs that are actually true.
 * @param {Animal} animal - The animal to check needs for
 * @returns {string} Comma-separated list of needs, or empty string if none
 */
function getAnimalNeeds(animal) {
    const needs = [];
    if (animal.needsWalk) needs.push("Walk");
    if (animal.needsFood) needs.push("Food");
    if (animal.needsWater) needs.push("Water");
    return needs.join(", ");
}

/**
 * Updates the XP bar display based on current hotel XP.
 */
function updateXpBar() {
    const xpBarFill = document.getElementById("xp-bar-fill");
    const xpCurrent = document.getElementById("xp-current");
    const xpMax = document.getElementById("xp-max");

    const percentageFilled = (hotel.currentXpAmount / hotel.xpToLevelUp) * 100;
    xpBarFill.style.width = `${Math.min(percentageFilled, 100)}%`;
    xpCurrent.textContent = hotel.currentXpAmount;
    xpMax.textContent = hotel.xpToLevelUp;
}

/**
 * Updates the displayed list of guests currently in the hotel.
 */
function updateGuestList() {
    const guestList = document.getElementById("animal-checked-in-list");
    const careList = document.getElementById("care-animal-list");
    guestList.innerHTML = "";
    careList.innerHTML = "";
    for (let i = 0; i < hotel.animalsInHotel.length; i++) {
        const animal = hotel.animalsInHotel[i];
        const animalNeeds = getAnimalNeeds(animal);
        const hasNeeds = animal.needsWalk || animal.needsFood || animal.needsWater;

        const newCard = document.createElement("div");
        newCard.className = "guest-card";
        newCard.id = `guest-card-${i + 1}`;
        newCard.innerHTML = `
            <div class="guest-card-header">
                <h3>🐾 ${animal.name}</h3>
                <span class="guest-type">${animal.animalType}</span>
            </div>
            <div class="guest-card-details">
                <div class="detail-row">
                    <span class="label">Size:</span>
                    <span class="value">${animal.animalSize}</span>
                </div>
                <div class="detail-row">    
                    <span class="label">Days Left:</span>
                    <span class="value days-left">${animal.amountOfDayLeft}</span>
                </div>
                <div class="detail-row">    
                    <span class="label">Type of food:</span>
                    <span class="value">${animal.needFoodType}</span>
                </div>
                <div class="detail-row">    
                    <span class="label">Food amount a day:</span>
                    <span class="value">${animal.amountOfFoodPerDay}</span>
                </div>
                ${hasNeeds ? `<div class="detail-row">    
                    <span class="label">Animal needs:</span>
                    <span class="value">${animalNeeds}</span>
                </div>` : ""}
            </div>
        `;
        guestList.appendChild(newCard);
        careList.appendChild(newCard.cloneNode(true));
    }

    const isEmpty = hotel.animalsInHotel.length < 1;
    toggleEmptyMessages(isEmpty, "empty-message-guest", "empty-message-care");
}
export { updateGuestList };

//2nd function: check animal out
/**
 * Checks out all animals whose stay duration has ended.
 * Adds their fees to the hotel's money and frees up hotel space.
 * @param {Event} e - The click event
 */
function checkOutAnimal(e) {
    e.preventDefault();

    if (hotel.animalsInHotel.length === 0) {
        return;
    }

    // Count animals ready for checkout
    let animalsReadyForCheckout = 0;
    for (let animal of hotel.animalsInHotel) {
        if (animal.amountOfDayLeft <= 0) {
            animalsReadyForCheckout++;
        }
    }

    if (animalsReadyForCheckout > 0) {
        // Remove animals in reverse order to prevent index issues
        for (let i = hotel.animalsInHotel.length - 1; i >= 0; i--) {
            const animal = hotel.animalsInHotel[i];
            if (animal.amountOfDayLeft <= 0) {
                alert(`${animal.name} has checked out!`);
                hotel.hotelCapacity += animal.animalSize;
                hotel.hotelMoney += animal.moneyForAnimal;
                const capacityStat = document.getElementById("stat-capacity");
                capacityStat.textContent = `${TOTAL_HOTEL_SPACES - hotel.hotelCapacity} / ${TOTAL_HOTEL_SPACES}`;
                const moneyDisplay = document.getElementById("stat-money");
                moneyDisplay.textContent = `$${hotel.hotelMoney}`;

                hotel.currentXpAmount += animal.xp;


                hotel.animalsInHotel.splice(i, 1);
            }
        }
        updateGuestList();

        hotel.tryLevelUp();
        updateXpBar();
        updateXpDisplay(hotel);
    } else {
        alert("No animals are ready to check out yet!");
    }
}





/**
 * Processes a day passing in the game.
 * Deducts daily fees, decreases animal stay duration, increments day counter,
 * and checks debt status.
 * @param {Event} e - The click event
 */
function passDay(e) {
    e.preventDefault();

    // Check animal satisfaction and removes them if not satified
    if (hotel.animalsInHotel.length > 0) {
        for (let i = hotel.animalsInHotel.length - 1; i >= 0; i--) {
            if (hotel.animalsInHotel[i].checkSatisfaction() == false) {
                alert(`${hotel.animalsInHotel[i].name} the ${hotel.animalsInHotel[i].animalType} left the hotel after not being take care of!`)
                hotel.hotelCapacity += hotel.animalsInHotel[i].animalSize;
                const capacityStat = document.getElementById("stat-capacity");
                capacityStat.textContent = `${TOTAL_HOTEL_SPACES - hotel.hotelCapacity} / ${TOTAL_HOTEL_SPACES}`;
                hotel.animalsInHotel.splice(i, 1);
            }
        }
    }


    // Deduct daily fee
    hotel.hotelMoney -= hotel.dailyFee;
    const moneyDisplay = document.getElementById("stat-money");
    moneyDisplay.textContent = `$${hotel.hotelMoney}`;

    // Decrease remaining days for each animal and reset their daily needs
    if (hotel.animalsInHotel.length > 0) {
        for (let animal of hotel.animalsInHotel) {
            animal.amountOfDayLeft--;
            animal.newNeedsForDay();
        }
    }

    // Increment day counter
    hotel.dayCount++;
    const dayCounter = document.getElementById("stat-day");
    dayCounter.textContent = `${hotel.dayCount}`;

    // Check debt status
    hotel.checkDayInDebt();

    // Update guest list to reflect changes
    updateGuestList();

    //We try to level up even after the day passes for more security
    hotel.tryLevelUp();
    updateXpBar();
    updateXpDisplay(hotel);
}