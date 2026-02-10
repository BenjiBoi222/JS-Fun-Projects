/**
 * @fileoverview Randomizer class for generating random animals and calculating game values
 */

import { Animal } from "./animal.js";
import { SystemFunctions } from "./systemFunctions.js";

// Constants for animal generation
const FOOD_TYPES = ["Beef", "Chicken", "Pork", "Apple", "Carrot", "Potato"];
const ANIMAL_TYPES = ["Dog", "Cat", "Rabbit", "Hamster", "Parrot"];
const ANIMAL_NAMES = ["Buddy", "Mittens", "Fluffy", "Charlie", "Luna", "Max", "Bella", "Rocky", "Daisy", "Oliver"];

const ANIMAL_SIZE = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3
};

const DAYS_BASE = 7;

const FOOD_AMOUNTS = {
    SMALL: { min: 1, max: 3 },
    MEDIUM: { min: 3, max: 6 },
    LARGE: { min: 6, max: 10 }
};

const MONEY_RANGE = {
    SMALL: { min: 500, max: 1000 },
    MEDIUM: { min: 1000, max: 2000 },
    LARGE: { min: 2000, max: 5000 }
};

/**
 * A class to generate random values for various purposes in the game.
 * @class
 */
class Randomizer {
    /**
     * Creates a new Randomizer instance.
     */
    constructor() {}

    /**
     * Generates a random animal with all necessary attributes and adds it to the waiting line.
     */
    generateRandomAnimal() {
        const randomType = ANIMAL_TYPES[Math.floor(Math.random() * ANIMAL_TYPES.length)];
        const randomFood = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
        const randomName = ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)];
        const amountOfDayLeft = Math.floor(Math.random() * DAYS_BASE) + 1;
        const randomSize = Math.floor(Math.random() * 3) + 1; // 1: Small, 2: Medium, 3: Large
        const amountOfFoodPerDay = this.calculateFood(randomSize);
        const moneyForAnimal = this.calculateMoney(randomSize, amountOfDayLeft);
        const xp = randomSize * 25;

        const animal = new Animal(
            randomName,
            amountOfDayLeft,
            randomSize,
            moneyForAnimal,
            randomType,
            randomFood,
            amountOfFoodPerDay,
            xp
        );
        SystemFunctions.addAnimal(animal);
    }

    /**
     * Calculates the food consumption for an animal based on its size.
     * @param {number} animalSize - The size of the animal (1: Small, 2: Medium, 3: Large)
     * @returns {number} The amount of food consumed per day
     */
    calculateFood(animalSize) {
        switch (animalSize) {
            case ANIMAL_SIZE.SMALL:
                // 1-3 units of food for small animals
                return Math.floor(Math.random() * (FOOD_AMOUNTS.SMALL.max - FOOD_AMOUNTS.SMALL.min + 1)) + FOOD_AMOUNTS.SMALL.min;
            case ANIMAL_SIZE.MEDIUM:
                // 3-6 units of food for medium animals
                return Math.floor(Math.random() * (FOOD_AMOUNTS.MEDIUM.max - FOOD_AMOUNTS.MEDIUM.min + 1)) + FOOD_AMOUNTS.MEDIUM.min;
            case ANIMAL_SIZE.LARGE:
                // 6-10 units of food for large animals
                return Math.floor(Math.random() * (FOOD_AMOUNTS.LARGE.max - FOOD_AMOUNTS.LARGE.min + 1)) + FOOD_AMOUNTS.LARGE.min;
            default:
                return 1;
        }
    }

    /**
     * Calculates the payment for an animal based on its size and stay duration.
     * Payment scales with the number of days the animal will stay.
     * @param {number} animalSize - The size of the animal (1: Small, 2: Medium, 3: Large)
     * @param {number} amountOfDayLeft - Number of days the animal will stay
     * @returns {number} The total payment amount
     */
    calculateMoney(animalSize, amountOfDayLeft) {
        switch (animalSize) {
            case ANIMAL_SIZE.SMALL:
                // 500-1000 for small/7 days
                const smallMoney = Math.floor(Math.random() * (MONEY_RANGE.SMALL.max - MONEY_RANGE.SMALL.min + 1)) + MONEY_RANGE.SMALL.min;
                return Math.floor((smallMoney / DAYS_BASE) * amountOfDayLeft);
            case ANIMAL_SIZE.MEDIUM:
                // 1000-2000 for medium/7 days
                const mediumMoney = Math.floor(Math.random() * (MONEY_RANGE.MEDIUM.max - MONEY_RANGE.MEDIUM.min + 1)) + MONEY_RANGE.MEDIUM.min;
                return Math.floor((mediumMoney / DAYS_BASE) * amountOfDayLeft);
            case ANIMAL_SIZE.LARGE:
                // 2000-5000 for large/7 days
                const largeMoney = Math.floor(Math.random() * (MONEY_RANGE.LARGE.max - MONEY_RANGE.LARGE.min + 1)) + MONEY_RANGE.LARGE.min;
                return Math.floor((largeMoney / DAYS_BASE) * amountOfDayLeft);
            default:
                return 100;
        }
    }
}

export { Randomizer };