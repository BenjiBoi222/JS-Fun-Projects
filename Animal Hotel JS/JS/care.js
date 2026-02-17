/**
 * @fileoverview Care menu functionality for managing animal care
 */

import { hotel } from "./register.js";
import { updateGuestList } from "./functions.js";
import { updateFoodStockDisplay } from "./shop.js";

//1 things we need to do in this file:
//3. Allow the player to fulfill the animal's needs (walk, feed, water)

//Dom elements
const careMenu = document.getElementById("care-menu");
const walkButton = document.getElementById("walk-animals-btn");
const feedButton = document.getElementById("give-food-btn");
const waterButton = document.getElementById("give-water-btn");

/**
 * Generic function to handle animal care actions
 * @param {string} needType - The type of need to check ('needsWalk', 'needsFood', 'needsWater')
 * @param {string} actionName - The name of the action for messages ('walked', 'fed', 'gave water to')
 * @param {Function} actionCallback - The action to perform on the animal
 * @param {string} noNeedMessage - Message to show when no animals need this care
 */
function performAnimalCare(needType, actionName, actionCallback, noNeedMessage) {
    let caredForAnimals = 0;

    for (let animal of hotel.animalsInHotel) {
        if (animal[needType] === true && caredForAnimals < hotel.workersAmount) {
            actionCallback(animal);
            caredForAnimals++;
            alert(`You ${actionName} ${animal.name}!`);
        }
    }

    if (caredForAnimals === 0) {
        alert(noNeedMessage);
    }
    updateGuestList();
}

//Walking animals
walkButton.addEventListener('click', (event) => {
    event.preventDefault();
    performAnimalCare('needsWalk', 'walked', (animal) => animal.walk(), "No animals need walking right now.");
});

//Watering animals
waterButton.addEventListener('click', (event) => {
    event.preventDefault();
    performAnimalCare('needsWater', 'gave water to', (animal) => animal.water(), "No animals need water right now.");
});

//Feeding animals
feedButton.addEventListener('click', (event) => {
    event.preventDefault();
    let caredForAnimals = 0;

    for (let animal of hotel.animalsInHotel) {
        if (animal.needsFood === true) {
            if (hotel.foodStock[animal.needFoodType] >= animal.amountOfFoodPerDay && caredForAnimals < hotel.workersAmount) {
                animal.feed();
                hotel.foodStock[animal.needFoodType] -= animal.amountOfFoodPerDay;
                caredForAnimals++;
                alert(`You fed ${animal.name} with ${animal.needFoodType}!`);

                updateFoodStockDisplay();
            } else {
                alert(`Not enough ${animal.needFoodType} to feed ${animal.name}!`);
            }
        }
    }
    updateGuestList();
});