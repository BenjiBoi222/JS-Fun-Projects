/**
 * @fileoverview Utility functions for calculating level-based limits and updating UI
 */

/**
 * Calculates the maximum number of slots a player can have based on their level
 * @param {number} level - The current hotel level
 * @returns {number} Maximum number of slots allowed
 */
function calculateMaxSlots(level) {
    switch (true) {
        case level >= 20:
            return 20;
        case level >= 15:
            return 12;
        case level >= 10:
            return 8;
        case level >= 5:
            return 6;
        default:
            return 5;
    }
}

/**
 * Calculates the maximum number of workers a player can hire based on their level
 * @param {number} level - The current hotel level
 * @returns {number} Maximum number of workers allowed
 */
function calculateMaxWorkers(level) {
    switch (true) {
        case level >= 20:
            return 5;
        case level >= 15:
            return 4;
        case level >= 10:
            return 3;
        case level >= 5:
            return 2;
        default:
            return 1;
    }
}

/**
 * Updates all XP-related UI elements
 * @param {Object} hotel - The hotel object
 */
function updateXpDisplay(hotel) {
    const hotelXp = document.getElementById("hotel-xp");
    const hotelXpMax = document.getElementById("hotel-xp-max");
    const hotelLevel = document.getElementById("hotel-level");

    hotelXp.textContent = `${hotel.currentXpAmount}`;
    hotelXpMax.textContent = `${hotel.xpToLevelUp}`;
    hotelLevel.textContent = `${hotel.currentLevel}`;
}

/**
 * Toggles the visibility of empty message elements based on condition
 * @param {boolean} isEmpty - Whether to show the empty messages
 * @param {...string} elementIds - IDs of elements to toggle
 */
function toggleEmptyMessages(isEmpty, ...elementIds) {
    const display = isEmpty ? "block" : "none";
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = display;
        }
    });
}

export { calculateMaxSlots, calculateMaxWorkers, updateXpDisplay, toggleEmptyMessages };
