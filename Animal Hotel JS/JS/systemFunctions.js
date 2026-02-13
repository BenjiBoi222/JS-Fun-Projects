/**
 * @fileoverview System utility functions for managing game state and animal queue
 */

import { Randomizer } from "./randomizer.js";

/**
 * A class to hold system functions that manage application state.
 * Manages the waiting queue of animals and dynamically populates it.
 * @class
 */
class SystemFunctions {
    /**
     * Static list to store all animals waiting to check in
     * @type {Array<Animal>}
     */
    static animalsInLine = [];

    /**
     * Adds an animal to the waiting queue.
     * @param {Animal} animal - The animal to add to the queue
     */
    static addAnimal(animal) {
        this.animalsInLine.push(animal);
    }

    /**
     * Removes an animal from the waiting queue.
     * @param {Animal} animal - The animal to remove from the queue
     */
    static removeAnimal(animal) {
        const index = this.animalsInLine.indexOf(animal);
        if (index > -1) {
            this.animalsInLine.splice(index, 1);
        }
    }

    /**
     * Fills the animal waiting queue up to 5 animals.
     * Generates new random animals using the Randomizer class
     * and updates the display list in the UI.
     */
    static fillAnimalLine() {
        const parentUl = document.getElementById("line-list");
        const generator = new Randomizer();

        // Generate animals until queue is full (5 animals)
        while (this.animalsInLine.length < 5) {
            generator.generateRandomAnimal();
        }

        // Clear and repopulate the display list
        parentUl.innerHTML = "";

        for (let i = 0; i < this.animalsInLine.length; i++) {
            const newLi = document.createElement("li");
            newLi.textContent = `${i + 1}) ${this.animalsInLine[i].name} the ${this.animalsInLine[i].animalType}`;
            parentUl.appendChild(newLi);
        }
    }

    /**
     * Shows the level up modal with beautiful effects and auto-closes after 5 seconds
     * @param {number} newLevel - The new level the player reached
     */
    static showLevelUpModal(newLevel) {
        const modal = document.getElementById("levelup-modal");
        const gameContainer = document.getElementById("game-container");
        const newLevelSpan = document.getElementById("new-level");
        const closeButton = document.getElementById("levelup-close-btn");

        // Update the level display
        newLevelSpan.textContent = newLevel;

        // Show modal and blur background
        modal.classList.remove("hidden");
        gameContainer.classList.add("blurred");

        // Create a function to close the modal
        const closeLevelUpModal = () => {
            modal.classList.add("hidden");
            gameContainer.classList.remove("blurred");
            closeButton.removeEventListener("click", closeLevelUpModal);
            clearTimeout(autoCloseTimeout);
        };

        // Allow clicking the button to close early
        closeButton.addEventListener("click", closeLevelUpModal);

        // Auto-close after 5 seconds
        const autoCloseTimeout = setTimeout(closeLevelUpModal, 5000);
    }

    static showAlert(message, title = "System Alert") {
        const modal = document.getElementById("alert-modal");
        const gameContainer = document.getElementById("game-container");
        const alertMessage = document.getElementById("alert-message");
        const closeButton = document.getElementById("alert-close-btn");

        // Update the alert message
        alertMessage.textContent = message;

        // Show modal and blur background
        modal.classList.remove("hidden");
        gameContainer.classList.add("blurred");

        // Create a function to close the modal
        const closeAlertModal = () => {
            modal.classList.add("hidden");
            gameContainer.classList.remove("blurred");
            closeButton.removeEventListener("click", closeAlertModal);
            clearTimeout(autoCloseTimeout);
        };

        // Allow clicking the button to close early
        closeButton.addEventListener("click", closeAlertModal);

        // Auto-close after 5 seconds
        const autoCloseTimeout = setTimeout(closeAlertModal, 5000);
    }
    
}

export { SystemFunctions };