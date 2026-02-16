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
     * Creates and displays a dynamic modal popup
     * @param {string} title - The modal title
     * @param {Array<{text: string, type: string}>} content - Array of content items (text with type: 'text', 'input', 'paragraph')
     * @param {Array<{label: string, callback: Function}>} buttons - Array of buttons with labels and callbacks
     * @param {number} timeout - Auto-close timeout in ms (0 for no auto-close)
     * @returns {HTMLElement} The modal element
     */
    static createPopUp(title, content, buttons, timeout = 0) {
        const modal = document.createElement('div');
        modal.className = "modal";
        modal.id = `modal-${Date.now()}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = "modal-content";

        const h2 = document.createElement('h2');
        h2.textContent = title;
        contentDiv.appendChild(h2);

        // Add content items
        if (Array.isArray(content)) {
            content.forEach(item => {
                if (item.type === 'text' || item.type === 'paragraph') {
                    const p = document.createElement('p');
                    p.textContent = item.text;
                    contentDiv.appendChild(p);
                } else if (item.type === 'input') {
                    const input = document.createElement('input');
                    input.type = item.inputType || 'text';
                    input.placeholder = item.placeholder || '';
                    input.id = item.id || '';
                    if (item.maxLength) input.maxLength = item.maxLength;
                    contentDiv.appendChild(input);
                }
            });
        }

        // Add buttons
        if (Array.isArray(buttons)) {
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.textContent = btn.label;
                button.onclick = () => {
                    if (btn.callback) btn.callback();
                    this.closeModal(modal);
                };
                contentDiv.appendChild(button);
            });
        }

        modal.appendChild(contentDiv);
        document.body.appendChild(modal);

        // Show modal and blur background
        const gameContainer = document.getElementById("game-container");
        if (gameContainer) gameContainer.classList.add("blurred");

        // Auto-close if timeout is set
        if (timeout > 0) {
            setTimeout(() => this.closeModal(modal), timeout);
        }

        return modal;
    }

    /**
     * Closes a modal and removes blur effect
     * @param {HTMLElement} modal - The modal element to close
     */
    static closeModal(modal) {
        modal.classList.add("hidden");
        const gameContainer = document.getElementById("game-container");
        if (gameContainer && !document.querySelector(".modal:not(.hidden)")) {
            gameContainer.classList.remove("blurred");
        }
        setTimeout(() => modal.remove(), 300);
    }

    /**
     * Shows the level up modal with auto-close after 5 seconds
     * @param {number} newLevel - The new level the player reached
     */
    static showLevelUpModal(newLevel) {
        const content = [
            { type: 'text', text: `You have reached level ${newLevel}!` },
            { type: 'text', text: 'New upgrades are available in the shop!' }
        ];
        const buttons = [
            { label: 'Continue', callback: null }
        ];
        this.createPopUp('⭐ LEVEL UP! ⭐', content, buttons, 5000);
    }

    /**
     * Shows an alert modal
     * @param {string} message - The alert message
     * @param {string} title - The alert title
     * @param {number} timeout - Auto-close timeout in ms (default 5000)
     */
    static showAlert(message, title = "🔔 System Alert 🔔", timeout = 5000) {
        const content = [
            { type: 'text', text: message }
        ];
        const buttons = [
            { label: 'Close', callback: null }
        ];
        this.createPopUp(title, content, buttons, timeout);
    }

    /**
     * Shows the hotel name input modal
     * @param {Function} onConfirm - Callback when name is confirmed
     */
    static showHotelNameModal(onConfirm) {
        const content = [
            { type: 'text', text: 'What would you like to name your animal hotel?' },
            { type: 'input', placeholder: 'Enter hotel name...', maxLength: 30, id: 'hotel-name-input' }
        ];
        const buttons = [
            { label: 'Start Game', callback: () => {
                const input = document.getElementById('hotel-name-input');
                if (onConfirm) onConfirm(input.value);
            }}
        ];
        this.createPopUp('Create Your Hotel', content, buttons, 0);
    }

}

export { SystemFunctions };