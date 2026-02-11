/**
 * @fileoverview Care menu functionality for managing animal care
 */

import { hotel } from "./register.js";
import { updateGuestList } from "./functions.js";

//1 things we need to do in this file:
//3. Allow the player to fulfill the animal's needs (walk, feed, water)

//Dom elements
const careMenu = document.getElementById("care-menu");
const walkButton = document.getElementById("walk-animals-btn");
const feedButton = document.getElementById("give-food-btn");
const waterButton = document.getElementById("give-water-btn");

//Walking animals
walkButton.addEventListener('click', (event) => {
    event.preventDefault();
    let caredForAnimals = 0;
    for(let animal of hotel.animalsInHotel){
        if (animal.needsWalk == true && caredForAnimals < hotel.workersAmount) {
            animal.walk();
            caredForAnimals++;
            alert(`You walked ${animal.name}!`);
        }
    }
    if(caredForAnimals == 0){
        alert("No animals need walking right now.");
    }
    updateGuestList();
});

//Watering animals
waterButton.addEventListener('click', (event) => {
    event.preventDefault();
    let caredForAnimals = 0;
    for(let animal of hotel.animalsInHotel){
        if (animal.needsWater == true && caredForAnimals < hotel.workersAmount) {
            animal.water();
            caredForAnimals++;
            alert(`You gave water to ${animal.name}!`);
        }
    }
    if(caredForAnimals == 0){
        alert("No animals need water right now.");
    }
    updateGuestList();
})

//Feeding animals